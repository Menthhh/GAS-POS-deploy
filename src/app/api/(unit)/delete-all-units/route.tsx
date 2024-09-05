// src/app/api/(unit)/delete-all-units/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: Unit
 *     description: API endpoints related to unit management
 * 
 * /api/unit/delete-all-units:
 *   delete:
 *     summary: Delete all units
 *     tags: [Unit]
 *     description: This endpoint deletes all units from the database.
 *     responses:
 *       200:
 *         description: Successfully deleted all units.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req:NextRequest, res: NextApiResponse) => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query('DELETE FROM UNIT', (err:string, result:string) => {
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
