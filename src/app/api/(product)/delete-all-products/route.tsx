// src/app/api/(product)/delete-all-products/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: API endpoints related to product operations
 * 
 * /api/product/delete-all-products:
 *   delete:
 *     summary: Delete all products
 *     tags: [Product]
 *     description: This endpoint deletes all products from the database.
 *     responses:
 *       200:
 *         description: Successfully deleted all products.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req:NextRequest, res: NextApiResponse) => {
    try {

        const result = await new Promise((resolve, reject) => {
            db.query('DELETE FROM PRODUCT', (err:string, result:string) => {
                if (err) {
                    reject(err);
                    console.log(err);
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
