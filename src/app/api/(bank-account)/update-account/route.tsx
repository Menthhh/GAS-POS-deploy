// src/app/api/(bank-account)/update-account/route.tsx
import { NextRequest,NextResponse } from "next/server";
import db from "@/lib/config/db";

/**
 * @swagger
 * tags:
 *   - name: Bank Account
 *     description: API endpoints related to bank account operations
 * 
 * /api/bank-account/update-account:
 *   put:
 *     summary: Update a bank account
 *     tags: [Bank Account]
 *     description: Update the details of an existing bank account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ACCOUNT_NUMBER:
 *                 type: string
 *                 description: The account number (ACCOUNT_ID) of the account to be updated.
 *                 example: "1234567890"
 *               BANK_NAME:
 *                 type: string
 *                 description: The name of the bank.
 *                 example: "Bank of Example"
 *               LOCATION:
 *                 type: string
 *                 description: The location of the bank branch.
 *                 example: "New York"
 *               ACCOUNT_TYPE:
 *                 type: string
 *                 description: The type of account.
 *                 example: "Savings"
 *     responses:
 *       200:
 *         description: Successfully updated the bank account.
 *       500:
 *         description: Internal server error.
 */

// CREATE TABLE BANK_ACCOUNT (
// 	ACCOUNT_ID VARCHAR(255) PRIMARY KEY NOT NULL,
// 	ACCOUNT_NUMBER VARCHAR(255),
//     BANK_NAME VARCHAR(255),
//     LOCATION VARCHAR(255),
//     ACCOUNT_TYPE VARCHAR(255)
// )
// ACCOUNT_ID: editData?.ACCOUNT_ID,
// ACCOUNT_NUMBER: e.target.accountNumber.value,
// BANK_NAME: e.target.bankName.value,
// LOCATION: e.target.location.value,
// ACCOUNT_TYPE: e.target.accountType.value,

export const PUT = async (req: NextRequest, res:NextResponse) => {
    const body  = await req.json();
    const {
        ACCOUNT_NUMBER,
        BANK_NAME,
        LOCATION,
        ACCOUNT_TYPE
    } = body;

    try {
        const result = await new Promise((resolve, reject) => {
            db.query(
                `UPDATE BANK_ACCOUNT SET BANK_NAME = '${BANK_NAME}', LOCATION = '${LOCATION}', ACCOUNT_TYPE = '${ACCOUNT_TYPE}' WHERE ACCOUNT_ID = '${ACCOUNT_NUMBER}'`,
                (err:any, result:any) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(result);
                }
            );
        });

        return NextResponse.json({ status: 200 });
    }catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500 });
    }
}
    
