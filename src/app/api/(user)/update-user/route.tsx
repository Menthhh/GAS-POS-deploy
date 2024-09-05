// src/app/api/(user)/update-user/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import path from "path";
import { writeFile } from "fs/promises";
import db from "@/lib/config/db";

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API endpoints related to user management
 * 
 * /api/user/update-user:
 *   put:
 *     summary: Update a user
 *     tags: [User]
 *     description: This endpoint allows you to update an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user.
 *               fullName:
 *                 type: string
 *                 description: The full name of the user.
 *               workerType:
 *                 type: string
 *                 description: The type of worker.
 *               username:
 *                 type: string
 *                 description: The username for login.
 *               password:
 *                 type: string
 *                 description: The password for login.
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Profile picture of the user.
 *     responses:
 *       200:
 *         description: Successfully updated the user.
 *       500:
 *         description: Internal server error.
 */

export const PUT = async (req:NextRequest, res:NextResponse) => {
    const formData = await req.formData();

    const file = formData.get("file");
    const userId = formData.get("userId");
    const fullName = formData.get("fullName");
    const workerType = formData.get("workerType");
    const username = formData.get("username");
    const password = formData.get("password");
  
    console.log("user id", userId);
    console.log("File", file);
    console.log("Full name", fullName);
    console.log("Worker type", workerType);
    console.log("Username", username);
    console.log("Password", password);

    try {
        let imagePath;
        if (file && file instanceof File) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const fileExtension = file.name.split('.').pop();
            const filename = `${userId}.${fileExtension}`;

            // Save the file to the server
            await writeFile(
                path.join(process.cwd(), "public/user-profile-pic/" + filename),
                buffer
            );
            imagePath = `/user-profile-pic/${filename}`;

        } else {
            // Retrieve the existing image path from the database if no new file is provided
            const result = await new Promise((resolve, reject) => {
                db.query(`SELECT PROFILE_IMG FROM USER WHERE USER_ID = ?`, [userId], (err:any, results:any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results[0].PROFILE_IMG);
                    }
                });
            });
            imagePath = result;
        }

        // Update product details in the database
        await new Promise((resolve, reject) => {
            db.query(
                `UPDATE USER SET FULL_NAME = ?, WORKER_TYPE = ?, USERNAME = ?, PASSWORD = ?, PROFILE_IMG = ? WHERE USER_ID = ?`,
                [fullName, workerType, username, password, imagePath, userId],
                (err:any, result:any) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(result);
                }
            );
        });

        return NextResponse.json({
            status: 200,
            message: "Updated successfully",
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({
            status: 500,
            message: "An error occurred while updating.",
        });
    }
};
