// src/app/api/(stock-product)/(Improve-product)/delete-all-Improve-product/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: ImproveProduct
 *     description: API endpoints related to improving product management
 * 
 * /api/stock-product/Improve-product/delete-all-Improve-product:
 *   delete:
 *     summary: Delete all improve products
 *     tags: [ImproveProduct]
 *     description: This endpoint deletes all improve products from the database.
 *     responses:
 *       200:
 *         description: Successfully deleted all improve products.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req:NextRequest, res: NextApiResponse) => {
    try {
        await new Promise((resolve, reject) => {
            db.query('DELETE FROM CHECK_STOCK', (err:string, result:string) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        await new Promise((resolve, reject) => {
            db.query('DELETE FROM CHECK_STOCK_DT', (err:string, result:string) => {
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
