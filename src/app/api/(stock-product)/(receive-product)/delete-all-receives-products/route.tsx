// src/app/api/(stock-product)/(receive-product)/delete-all-receives-products/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: ReceiveProduct
 *     description: API endpoints related to receiving product management
 * 
 * /api/stock-product/receive-product/delete-all-receives-products:
 *   delete:
 *     summary: Delete all receives products
 *     tags: [ReceiveProduct]
 *     description: This endpoint deletes all receives products from the database.
 *     responses:
 *       200:
 *         description: Successfully deleted all receives products.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req:NextRequest, res: NextApiResponse) => {
    try {

        await new Promise((resolve, reject) => {
            db.query('DELETE FROM RECEIVE', (err:string, result:string) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        await new Promise((resolve, reject) => {
            db.query('DELETE FROM RECEIVE_DT', (err:string, result:string) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });


        return NextResponse.json({status: 200});
    }
    catch (error) {
        console.log(error);
    }
}
