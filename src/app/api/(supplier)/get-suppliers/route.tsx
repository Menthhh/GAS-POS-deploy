// src/app/api/(supplier)/get-suppliers/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: Supplier
 *     description: API endpoints related to supplier management
 * 
 * /api/supplier/get-suppliers:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Supplier]
 *     description: This endpoint retrieves all suppliers from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the suppliers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 suppliers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       S_ID:
 *                         type: string
 *                         description: The ID of the supplier.
 *                       S_NAME:
 *                         type: string
 *                         description: The name of the supplier.
 *                       S_CONTACT_NAME:
 *                         type: string
 *                         description: The contact name of the supplier.
 *                       S_ADDRESS:
 *                         type: string
 *                         description: The address of the supplier.
 *                       S_TEL:
 *                         type: string
 *                         description: The phone number of the supplier.
 *                       S_TAX_ID:
 *                         type: string
 *                         description: The tax ID of the supplier.
 *       500:
 *         description: Internal server error.
 */

export const dynamic = 'force-dynamic';
interface ISupplier {
    S_ID: string;
    S_NAME: string;
    S_CONTACT_NAME: string;
    S_ADDRESS: string;
    S_TEL: string;
    S_TAX_ID: string;
}

export const GET = async (req:NextRequest, res: NextApiResponse) => {
    try {
        const suppliers: ISupplier[] = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM SUPPLIER', (err: string, results: ISupplier[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        return NextResponse.json({ suppliers, status: 200 });
    } catch (error) {
        console.log(error);
    }
};

