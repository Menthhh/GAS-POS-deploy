// src/app/api/(supplier)/delete-supplier/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';
import { unlink, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

/**
 * @swagger
 * tags:
 *   - name: Supplier
 *     description: API endpoints related to supplier management
 * 
 * /api/supplier/delete-supplier:
 *   delete:
 *     summary: Delete specific suppliers
 *     tags: [Supplier]
 *     description: This endpoint deletes specific suppliers based on their IDs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplierId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The IDs of the suppliers to delete.
 *                 example: ["S123", "S456"]
 *     responses:
 *       200:
 *         description: Successfully deleted the specified suppliers.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req:NextRequest, res: NextApiResponse) => {
    const body = await req.json();
    const { supplierId } = body;

    try {
       
        await Promise.all(supplierId.map(async (id: any) => {
            return new Promise((resolve, reject) => {
                db.query('DELETE FROM SUPPLIER WHERE S_ID = ?', [id], (err: string, result: any) => {
                    if (err) {
                        console.log('Error deleting product(s):', err);
                        reject(err);
                    }
                    resolve(result);
                });
            });
        }));

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('Error deleting product(s):', error);
        return NextResponse.json({ status: 500, message: 'An error occurred while deleting the product(s).' });
    }
};
