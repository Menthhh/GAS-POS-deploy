// src/app/api/(stock-product)/(receive-tank)/delete-all-receive-tank/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: ReceiveTank
 *     description: API endpoints related to receiving tank management
 * 
 * /api/stock-product/receive-tank/delete-all-receive-tank:
 *   delete:
 *     summary: Delete all receive tanks
 *     tags: [ReceiveTank]
 *     description: This endpoint deletes all receive tanks from the database.
 *     responses:
 *       200:
 *         description: Successfully deleted all receive tanks.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req:NextRequest, res: NextApiResponse) => {
    try {
        await new Promise((resolve, reject) => {
            db.query('DELETE FROM RECEIVE_TANK', (err:string, result:string) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        await new Promise((resolve, reject) => {
            db.query('DELETE FROM RECEIVE_TANK_DT', (err:string, result:string) => {
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
