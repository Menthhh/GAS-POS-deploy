// src/app/api/(user)/create-user/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import path from "path";
import { writeFile } from "fs/promises";
import db from "@/lib/config/db";
import { userIdGenerator } from "@/lib/utils";

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API endpoints related to user management
 * 
 * /api/user/create-user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     description: This endpoint allows you to create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
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
 *         description: Successfully created the user.
 *       500:
 *         description: Internal server error.
 */

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const file = formData.get("file");
  const fullName = formData.get("fullName");
  const workerType = formData.get("workerType");
  const username = formData.get("username");
  const password = formData.get("password");

  const userId = await userIdGenerator();
  let imagePath = "/user-profile-pic/default.jpg";

  if (file instanceof File) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split(".").pop();

    const filename = `${userId}.${fileExtension}`;

    try {
      // Save the file to the server
      await writeFile(
        path.join(process.cwd(), "public/user-profile-pic/" + filename),
        buffer
      );
      imagePath = `/user-profile-pic/${filename}`;
    } catch (error) {
      console.error("Error saving file:", error);
      return NextResponse.json(
        { status: 500, message: "An error occurred while saving the file." }
      );
    }
  }

  try {
    // Insert user details into the database
    await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO USER (USER_ID, FULL_NAME, WORKER_TYPE, USERNAME, PASSWORD, PROFILE_IMG) VALUES (?, ?, ?, ?, ?, ?)",
        [userId, fullName, workerType, username, password, imagePath],
        (err: any, result: any) => {
          if (err) {
            console.error("Error inserting user:", err);
            reject(err);
          }
          resolve(result);
        }
      );
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { status: 500, message: "An error occurred while creating the user." }
    );
  }
};
