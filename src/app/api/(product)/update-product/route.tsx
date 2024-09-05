// src/app/api/(product)/update-product/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import path from "path";
import { writeFile } from "fs/promises";
import db from "@/lib/config/db";

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: API endpoints related to product operations
 * 
 * /api/product/update-product:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     description: This endpoint allows you to update an existing product.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product.
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
 *               status:
 *                 type: string
 *                 description: The status of the product.
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The image file of the product.
 *     responses:
 *       200:
 *         description: Successfully updated the product.
 *       500:
 *         description: Internal server error.
 */

export const PUT = async (req: NextRequest, res: NextResponse) => {
    const formData = await req.formData();

    const file = formData.get("file");
    const productId = formData.get("productId");
    const productName = formData.get("productName");
    const productType = formData.get("productType");
    const unit = formData.get("unit");
    const unitAmount = formData.get("unitAmount");
    const retailPrice = formData.get("retailPrice");
    const wholesalePrice = formData.get("wholesalePrice");
    const notificationAmount = formData.get("notificationAmount");
    const status = formData.get("status");

    try {
        let imagePath;

        if (file && file.name) {
            // Assuming the file object has a name property and we can access its content
            const buffer = Buffer.from(await file.arrayBuffer());
            const fileExtension = file.name.split('.').pop();
            const filename = `${productId}.${fileExtension}`;

            // Save the file to the server
            await writeFile(
                path.join(process.cwd(), "public/uploads/" + filename),
                buffer
            );
            imagePath = `/uploads/${filename}`;
        } else {
            // Retrieve the existing image path from the database if no new file is provided
            const result = await new Promise((resolve, reject) => {
                db.query(`SELECT P_IMAGE FROM PRODUCT WHERE P_ID = ?`, [productId], (err: any, results: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results[0]?.P_IMAGE || null);
                    }
                });
            });
            imagePath = result;
        }

        // Update product details in the database
        await new Promise((resolve, reject) => {
            db.query(
                `UPDATE PRODUCT SET P_NAME = ?, P_TYPE = ?, P_UNIT = ?, P_UNIT_AMOUNT = ?, RETAIL_PRICE = ?, WHOLE_PRICE = ?, P_STATUS = ?, NOTIFICATION_AMOUNT = ?, P_IMAGE = ? WHERE P_ID = ?`,
                [
                    productName,
                    productType,
                    unit,
                    unitAmount,
                    retailPrice,
                    wholesalePrice,
                    status,
                    notificationAmount,
                    imagePath,
                    productId,
                ],
                (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });

        return NextResponse.json({
            message: "Product updated successfully",
            status: 200,
        });
    } catch (error) {
        console.log("Error occurred", error);
        return NextResponse.json({
            message: "Failed to update product",
            status: 500,
        });
    }
};
