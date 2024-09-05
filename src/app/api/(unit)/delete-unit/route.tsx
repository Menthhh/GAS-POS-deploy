// src/app/api/(unit)/delete-unit/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: Unit
 *     description: API endpoints related to unit management
 * 
 * /api/unit/delete-unit:
 *   delete:
 *     summary: Delete specific units
 *     tags: [Unit]
 *     description: This endpoint deletes specific units based on their IDs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               unit:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The IDs of the units to delete.
 *                 example: ["U123", "U456"]
 *     responses:
 *       200:
 *         description: Successfully deleted the specified units.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req:NextRequest, res: NextApiResponse) => {
    const body = await req.json();
    const { unit } = body;
    try {

       await Promise.all(unit.map(async (id: any) => {
            await new Promise((resolve, reject) => {
                db.query('DELETE FROM UNIT WHERE U_ID = ?', [id], (err:string, result:string) => {
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