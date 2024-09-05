// src/app/api/(bank-account)/delete-all-accounts/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: Bank Account
 *     description: API endpoints related to bank account operations
 * 
 * /api/bank-account/delete-all-accounts:
 *   delete:
 *     summary: Delete all bank accounts
 *     tags: [Bank Account]
 *     description: Delete all bank accounts from the database.
 *     responses:
 *       200:
 *         description: Successfully deleted all bank accounts.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req: NextRequest, res: NextApiResponse) => {
    try {

        const result = await new Promise((resolve, reject) => {
            db.query('DELETE FROM BANK_ACCOUNT', (err:string, result:string) => {
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
