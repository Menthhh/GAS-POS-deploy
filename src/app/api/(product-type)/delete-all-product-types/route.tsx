// src/app/api/(product-type)/delete-all-product-types/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: Product Type
 *     description: API endpoints related to product types operations
 * 
 * /api/product-type/delete-all-product-types:
 *   delete:
 *     summary: Delete all product types
 *     tags: [Product Type]
 *     description: This endpoint deletes all product types from the database.
 *     responses:
 *       200:
 *         description: Successfully deleted all product types.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req: NextRequest, res: NextApiResponse) => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query('DELETE FROM PRODUCT_TYPE', (err:string, result:string) => {
                if (err) {
                    console.log(err);
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
