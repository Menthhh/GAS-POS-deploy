// src/app/api/(user)/delete-all-users/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API endpoints related to user management
 * 
 * /api/user/delete-all-users:
 *   delete:
 *     summary: Delete all users
 *     tags: [User]
 *     description: This endpoint deletes all users from the database.
 *     responses:
 *       200:
 *         description: Successfully deleted all users.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req:NextRequest, res: NextApiResponse) => {
    try {

        const result = await new Promise((resolve, reject) => {
            db.query('DELETE FROM USER', (err:string, result:string) => {
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
