// src/app/api/(bank-account)/delete-account/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: Bank Account
 *     description: API endpoints related to bank account operations
 *
 * /api/bank-account/delete-account:
 *   delete:
 *     summary: Delete specific bank accounts
 *     tags: [Bank Account]
 *     description: Delete specific bank accounts based on their account IDs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of account IDs to delete.
 *                 example: ["1234567890", "0987654321"]
 *     responses:
 *       200:
 *         description: Successfully deleted the specified bank accounts.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req: NextRequest, res: NextApiResponse) => {
    const body = await req.json();
    const { accountId } = body;
    try {

       await Promise.all(accountId.map(async (id: any) => {
            await new Promise((resolve, reject) => {
                db.query('DELETE FROM BANK_ACCOUNT WHERE ACCOUNT_ID = ?', [id], (err:string, result:string) => {
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
