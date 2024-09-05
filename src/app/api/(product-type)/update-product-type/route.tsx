// src/app/api/(product-type)/update-product-type/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";

/**
 * @swagger
 * tags:
 *   - name: Product Type
 *     description: API endpoints related to product types operations
 * 
 * /api/product-type/update-product-type:
 *   put:
 *     summary: Update a product type
 *     tags: [Product Type]
 *     description: This endpoint updates the details of a product type.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productTypeId:
 *                 type: string
 *                 description: The ID of the product type to update.
 *                 example: "PT123"
 *               productType:
 *                 type: string
 *                 description: The new name of the product type.
 *                 example: "New Electronics"
 *     responses:
 *       200:
 *         description: Successfully updated the product type.
 *       500:
 *         description: Internal server error.
 */

export const PUT = async (req:NextRequest, res:NextResponse) => {
    try {
        const body = await req.json();
        const {
            productTypeId,
            productType
        } = body;
        const result = await new Promise((resolve, reject) => {
            db.query(
                `UPDATE PRODUCT_TYPE SET PT_NAME = '${productType}' WHERE PT_ID = '${productTypeId}'`,
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


