// src/app/api/(bank-account)/get-accounts/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: Bank Account
 *     description: API endpoints related to bank account operations
 * 
 * /api/bank-account/get-accounts:
 *   get:
 *     summary: Get all bank accounts
 *     tags: [Bank Account]
 *     description: Retrieve a list of all bank accounts.
 *     responses:
 *       200:
 *         description: A list of bank accounts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accounts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ACCOUNT_ID:
 *                         type: string
 *                       ACCOUNT_NUMBER:
 *                         type: string
 *                       BANK_NAME:
 *                         type: string
 *                       LOCATION:
 *                         type: string
 *                       ACCOUNT_TYPE:
 *                         type: string
 *       500:
 *         description: Internal server error.
 */

interface Account {
    ACCOUNT_ID: string;
    ACCOUNT_NUMBER: string;
    BANK_NAME: string;
    LOCATION: string;
    ACCOUNT_TYPE: string;
}

export const dynamic = 'force-dynamic';
export const GET = async (req: NextRequest, res: NextApiResponse) => {
    try {
        const accounts: Account[] = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM BANK_ACCOUNT', (err: string, results: Account[]) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        
        return NextResponse.json({ accounts, status: 200 });
    } catch (error) {
        console.log(error);
    }
};

