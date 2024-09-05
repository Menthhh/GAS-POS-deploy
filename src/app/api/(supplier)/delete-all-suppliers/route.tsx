// src/app/api/(supplier)/delete-all-suppliers/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: Supplier
 *     description: API endpoints related to supplier management
 * 
 * /api/supplier/delete-all-suppliers:
 *   delete:
 *     summary: Delete all suppliers
 *     tags: [Supplier]
 *     description: This endpoint deletes all suppliers from the database.
 *     responses:
 *       200:
 *         description: Successfully deleted all suppliers.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req:NextRequest, res: NextApiResponse) => {
    try {

        const result = await new Promise((resolve, reject) => {
            db.query('DELETE FROM SUPPLIER', (err:string, result:string) => {
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
