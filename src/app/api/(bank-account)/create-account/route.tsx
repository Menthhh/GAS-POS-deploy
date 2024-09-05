// src/app/api/(bank-account)/create-account/route.tsx
import db from "@/lib/config/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   - name: Bank Account
 *     description: API endpoints related to bank account operations
 *
 * /api/bank-account/create-account:
 *   post:
 *     summary: Create a new bank account
 *     tags: [Bank Account]
 *     description: This endpoint allows you to create a new bank account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountNumber:
 *                 type: string
 *                 description: The unique account number.
 *                 example: "1234567890"
 *               bankName:
 *                 type: string
 *                 description: The name of the bank.
 *                 example: "Bank of Example"
 *               location:
 *                 type: string
 *                 description: The location of the bank branch.
 *                 example: "New York"
 *               accountType:
 *                 type: string
 *                 description: The type of account.
 *                 example: "Savings"
 *     responses:
 *       200:
 *         description: Successfully created the bank account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 status:
 *                   type: number
 *                   example: 200
 *       400:
 *         description: Bad request, invalid or missing parameters.
 *       500:
 *         description: Internal server error.
 */

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { accountNumber, bankName, location, accountType } = body;

  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO BANK_ACCOUNT (ACCOUNT_ID, BANK_NAME, LOCATION, ACCOUNT_TYPE) VALUES ('${accountNumber}', '${bankName}', '${location}', '${accountType}')`,
        (err: any, results: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
    return NextResponse.json(
      { message: "Success", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "เลขที่บัญชีซ้ำกันรหัส", status: 500 },
      { status: 500 }
    );
  }
};
