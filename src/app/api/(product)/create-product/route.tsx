// src/app/api/(product)/create-product/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import path from "path";
import { writeFile } from "fs/promises";
import db from "@/lib/config/db";
import { productIdGenerator } from "@/lib/utils";

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: API endpoints related to product operations
 * 
 * /api/product/create-product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     description: This endpoint allows you to create a new product.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: The name of the product.
 *               productType:
 *                 type: string
 *                 description: The type of the product.
 *               unit:
 *                 type: string
 *                 description: The unit of the product.
 *               unitAmount:
 *                 type: number
 *                 description: The amount of units for the product.
 *               retailPrice:
 *                 type: number
 *                 description: The retail price of the product.
 *               wholesalePrice:
 *                 type: number
 *                 description: The wholesale price of the product.
 *               notificationAmount:
 *                 type: number
 *                 description: The notification amount for stock alerts.
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The image file of the product.
 *     responses:
 *       201:
 *         description: Successfully created the product.
 *       500:
 *         description: Internal server error.
 */

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const productName = formData.get("productName");
    const productType = formData.get("productType");
    const unit = formData.get("unit");
    const unitAmount = formData.get("unitAmount");
    const retailPrice = formData.get("retailPrice");
    const wholesalePrice = formData.get("wholesalePrice");
    const notificationAmount = formData.get("notificationAmount");

    const productId = await productIdGenerator();

    let imagePath = null;

    if (file && typeof file.arrayBuffer === 'function') {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileExtension = file.name.split('.').pop();
      const filename = `${productId}.${fileExtension}`;

      try {
        // Save the file to the server
        await writeFile(path.join(process.cwd(), "public/uploads/" + filename), buffer);
        imagePath = `/uploads/${filename}`;
      } catch (error) {
        console.log("Error occurred while saving file", error);
        return NextResponse.json({ message: "Failed to save file", status: 500 });
      }
    }

    const query = `INSERT INTO PRODUCT (P_ID, P_NAME, P_TYPE, P_UNIT, P_UNIT_AMOUNT, RETAIL_PRICE, WHOLE_PRICE, NOTIFICATION_AMOUNT${imagePath ? ', P_IMAGE' : ''}) VALUES (?, ?, ?, ?, ?, ?, ?, ?${imagePath ? ', ?' : ''})`;

    const params = [
      productId,
      productName,
      productType,
      unit,
      unitAmount,
      retailPrice,
      wholesalePrice,
      notificationAmount,
    ];

    if (imagePath) {
      params.push(imagePath);
    }

    await new Promise((resolve, reject) => {
      db.query(query, params, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    return NextResponse.json({
      message: "Product created successfully",
      status: 201,
    });
  } catch (error) {
    console.log("Error occurred", error);
    return NextResponse.json({
      message: "Failed to create product",
      status: 500,
    });
  }
};
