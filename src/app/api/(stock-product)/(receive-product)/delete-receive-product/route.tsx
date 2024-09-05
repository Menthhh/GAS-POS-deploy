// src/app/api/(stock-product)/(receive-product)/delete-receive-product/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: ReceiveProduct
 *     description: API endpoints related to receiving product management
 * 
 * /api/stock-product/receive-product/delete-receive-product:
 *   delete:
 *     summary: Delete specific receive products
 *     tags: [ReceiveProduct]
 *     description: This endpoint deletes specific receive products based on their reference numbers.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiveId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The reference numbers of the receive products to delete.
 *                 example: ["REF123", "REF456"]
 *     responses:
 *       200:
 *         description: Successfully deleted the specified receive products.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req:NextRequest, res: NextApiResponse) => {
    const body = await req.json();
    const { receiveId } = body;

    try {
       
        await Promise.all(receiveId.map(async (id: any) => {
            return new Promise((resolve, reject) => {
                db.query('DELETE FROM RECEIVE WHERE REFNO = ?', [id], (err: string, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        }));

        await Promise.all(receiveId.map(async (id: any) => {
            return new Promise((resolve, reject) => {
                db.query('DELETE FROM RECEIVE_DT WHERE REFNO = ?', [id], (err: string, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        }));

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('Error deleting product(s):', error);
        return NextResponse.json({ status: 500, error: error });
    }
};
