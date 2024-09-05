// src/app/api/(user)/delete-user/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

import { unlink, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API endpoints related to user management
 * 
 * /api/user/delete-user:
 *   delete:
 *     summary: Delete specific users
 *     tags: [User]
 *     description: This endpoint deletes specific users based on their IDs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The IDs of the users to delete.
 *                 example: ["U123", "U456"]
 *     responses:
 *       200:
 *         description: Successfully deleted the specified users.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req:NextRequest, res: NextApiResponse) => {
    const body = await req.json();
    const { userId } = body;
    try {
        const userImages = await Promise.all(userId.map(async (id: any) => {
            return new Promise((resolve, reject) => {
                db.query('SELECT PROFILE_IMG FROM USER WHERE USER_ID = ?', [id], (err: string, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    if (result.length > 0) {
                        resolve(result[0].PROFILE_IMG);
                    } else {
                        resolve(null);
                    }
                });
            });
        }));

        // Filter out null values (in case product IDs are not found in the database)
        const validImages = userImages.filter((image: string | null) => image !== null);

        // Delete images from server
        await Promise.all(validImages.map(async (relativeImagePath: string) => {
            const imagePath = path.join(process.cwd(), 'public', relativeImagePath); // Construct full path
            try {
                // Check if the image file exists before attempting to delete it
                await access(imagePath, constants.F_OK);
                await unlink(imagePath);
            } catch (err) {
                if (err) {
                    // Only log the error if it's not because the file does not exist
                    console.error(`Error deleting image ${imagePath}:`, err);
                }
            }
        }));

       await Promise.all(userId.map(async (id: any) => {
            await new Promise((resolve, reject) => {
                db.query('DELETE FROM USER WHERE USER_ID = ?', [id], (err:string, result:string) => {
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
        return NextResponse.json({ status: 500 });
    }
}
