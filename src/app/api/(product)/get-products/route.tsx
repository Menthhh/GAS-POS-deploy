// src/app/api/(product)/get-products/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: API endpoints related to product operations
 * 
 * /api/product/get-products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     description: This endpoint retrieves all products from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       P_ID:
 *                         type: string
 *                         description: The ID of the product.
 *                       P_NAME:
 *                         type: string
 *                         description: The name of the product.
 *                       P_TYPE:
 *                         type: string
 *                         description: The type of the product.
 *                       P_UNIT:
 *                         type: string
 *                         description: The unit of the product.
 *                       P_UNIT_AMOUNT:
 *                         type: number
 *                         description: The amount of units for the product.
 *                       P_STATUS:
 *                         type: string
 *                         description: The status of the product.
 *                       RETAIL_PRICE:
 *                         type: number
 *                         description: The retail price of the product.
 *                       WHOLE_PRICE:
 *                         type: number
 *                         description: The wholesale price of the product.
 *                       NOTIFICATION_AMOUNT:
 *                         type: number
 *                         description: The notification amount for stock alerts.
 *                       P_IMAGE:
 *                         type: string
 *                         description: The image URL of the product.
 *       500:
 *         description: Internal server error.
 */

interface Product {
    P_ID: string;
    P_NAME: string;
    P_TYPE: string;
    P_UNIT: string;
    P_UNIT_AMOUNT: number;
    P_STATUS: string;
    RETAIL_PRICE: number;
    WHOLE_PRICE: number;
    NOTIFICATION_AMOUNT: number;
    P_IMAGE: string;
}

export const GET = async (req:NextRequest, res: NextApiResponse) => {
    try {
        const products: Product[] = await new Promise((resolve, reject) => {
            db.query(`
            SELECT 
                P_ID, 
                P_NAME, 
                P_TYPE, 
                P_UNIT, 
                P_UNIT_AMOUNT, 
                P_STATUS, 
                RETAIL_PRICE, 
                WHOLE_PRICE, 
                NOTIFICATION_AMOUNT, 
                P_IMAGE
            FROM 
                PRODUCT
            `, (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(result);
            });
        });

        return NextResponse.json({ products, status: 200 });
    } catch (error) {
        console.log(error);
    }
};

