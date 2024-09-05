// src/app/api/(product-type)/delete-product-type/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: Product Type
 *     description: API endpoints related to product types operations
 * 
 * /api/product-type/delete-product-type:
 *   delete:
 *     summary: Delete specific product types
 *     tags: [Product Type]
 *     description: This endpoint deletes specific product types based on their IDs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productTypeId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The IDs of the product types to delete.
 *                 example: ["PT123", "PT456"]
 *     responses:
 *       200:
 *         description: Successfully deleted the specified product types.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req: NextRequest, res: NextApiResponse) => {
    const body = await req.json();
    const { productTypeId } = body;
    try {

       await Promise.all(productTypeId.map(async (id: any) => {
            await new Promise((resolve, reject) => {
                db.query('DELETE FROM PRODUCT_TYPE WHERE PT_ID = ?', [id], (err:string, result:string) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(result);
                });
            });
        }));

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log(error);
    }
}