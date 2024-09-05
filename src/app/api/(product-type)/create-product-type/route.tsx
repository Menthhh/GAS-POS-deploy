// src/app/api/(product-type)/create-product-type/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";
import { productTypeIdGenerator } from "@/lib/utils";

/**
 * @swagger
 * tags:
 *   - name: Product Type
 *     description: API endpoints related to product types operations
 * 
 * /api/product-type/create-product-type:
 *   post:
 *     summary: Create a new product type
 *     tags: [Product Type]
 *     description: This endpoint allows you to create a new product type.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productType:
 *                 type: string
 *                 description: The name of the product type.
 *                 example: "Electronics"
 *     responses:
 *       200:
 *         description: Successfully created the product type.
 *       500:
 *         description: Internal server error.
 */

export const POST = async (req:NextRequest, res:NextResponse) => {
    try {
        const body = await req.json();
        const { productType } = body;
        const productTypeId = await productTypeIdGenerator();
        const result = await new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO PRODUCT_TYPE (PT_ID, PT_NAME) VALUES ('${productTypeId}', '${productType}')`,
                (err:any, result:any) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(result);
                }
            );
        });

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500 });
    }
}


