// src/app/api/(product-type)/get-product-types/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";

/**
 * @swagger
 * tags:
 *   - name: Product Type
 *     description: API endpoints related to product types operations
 * 
 * /api/product-type/get-product-types:
 *   get:
 *     summary: Get all product types
 *     tags: [Product Type]
 *     description: This endpoint retrieves all product types from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the product types.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 productTypes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       PT_ID:
 *                         type: string
 *                         description: The ID of the product type.
 *                       PT_NAME:
 *                         type: string
 *                         description: The name of the product type.
 *                       example:
 *                         PT_ID: "PT123"
 *                         PT_NAME: "Electronics"
 *       500:
 *         description: Internal server error.
 */

export const dynamic = 'force-dynamic';
export const GET = async (req:NextRequest, res:NextResponse) => {
    try {
        const productTypes = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM PRODUCT_TYPE', (err:any, results:any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(results);
            } )
        });

        return NextResponse.json({ status: 200, productTypes });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500 });
    }
}


