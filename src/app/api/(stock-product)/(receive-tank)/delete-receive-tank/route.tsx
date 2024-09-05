// src/app/api/(stock-product)/(receive-tank)/delete-receive-tank/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: ReceiveTank
 *     description: API endpoints related to receiving tank management
 * 
 * /api/stock-product/receive-tank/delete-receive-tank:
 *   delete:
 *     summary: Delete specific receive tanks
 *     tags: [ReceiveTank]
 *     description: This endpoint deletes specific receive tanks based on their reference numbers.
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
 *                 description: The reference numbers of the receive tanks to delete.
 *                 example: ["REF123", "REF456"]
 *     responses:
 *       200:
 *         description: Successfully deleted the specified receive tanks.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req:NextRequest, res: NextApiResponse) => {
    const body = await req.json();
    const { ID } = body;

    try {
       
        await Promise.all(ID.map(async (id: any) => {
            return new Promise((resolve, reject) => {
                db.query('DELETE FROM RECEIVE_TANK WHERE REFNO = ?', [id], (err: string, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        }));

        await Promise.all(ID.map(async (id: any) => {
            return new Promise((resolve, reject) => {
                db.query('DELETE FROM RECEIVE_TANK_DT WHERE REFNO = ?', [id], (err: string, result: any) => {
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
