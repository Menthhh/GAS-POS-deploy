// src/app/api/(user)/get-users/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API endpoints related to user management
 * 
 * /api/user/get-users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     description: This endpoint retrieves all users from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       USER_ID:
 *                         type: string
 *                         description: The ID of the user.
 *                       FULL_NAME:
 *                         type: string
 *                         description: The full name of the user.
 *                       WORKER_TYPE:
 *                         type: string
 *                         description: The worker type of the user.
 *                       USERNAME:
 *                         type: string
 *                         description: The username of the user.
 *                       PASSWORD:
 *                         type: string
 *                         description: The password of the user.
 *                       PROFILE_IMG:
 *                         type: string
 *                         description: The profile image URL of the user.
 *       500:
 *         description: Internal server error.
 */

interface IUser {
    USER_ID: string;
    FULL_NAME: string;
    WORKER_TYPE: string;
    USERNAME: string;
    PASSWORD: string;
    PROFILE_IMG: string;
}
export const dynamic = 'force-dynamic';
export const GET = async (req:NextRequest, res: NextApiResponse) => {
    try {
        const users = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM USER', (err: string, result: IUser[]) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(result);
            });
        });

        return NextResponse.json({ users, status: 200 });
    } catch (error) {
        console.log(error);
    }
};

