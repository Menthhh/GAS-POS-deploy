// src/app/api/(stock-product)/(Improve-product)/delete-Improve-product/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: ImproveProduct
 *     description: API endpoints related to improving product management
 * 
 * /api/stock-product/Improve-product/delete-Improve-product:
 *   delete:
 *     summary: Delete specific improve products
 *     tags: [ImproveProduct]
 *     description: This endpoint deletes specific improve products based on their reference numbers.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The reference numbers of the improve products to delete.
 *                 example: ["REF123", "REF456"]
 *     responses:
 *       200:
 *         description: Successfully deleted the specified improve products.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req:NextRequest, res: NextApiResponse) => {
    const body = await req.json();
    const { ID } = body;

    try {
       
        await Promise.all(ID.map(async (id: any) => {
            return new Promise((resolve, reject) => {
                db.query('DELETE FROM CHECK_STOCK WHERE REFNO = ?', [id], (err: string, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        }));

        await Promise.all(ID.map(async (id: any) => {
            return new Promise((resolve, reject) => {
                db.query('DELETE FROM CHECK_STOCK_DT WHERE REFNO = ?', [id], (err: string, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        }));

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('Error deleting Check Stock(s):', error);
        return NextResponse.json({ status: 500, error: error });
    }
};
