// src/app/api/(stock-product)/(receive-product)/get-receives/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: ReceiveProduct
 *     description: API endpoints related to receiving product management
 * 
 * /api/stock-product/receive-product/get-receives:
 *   get:
 *     summary: Get all receive products
 *     tags: [ReceiveProduct]
 *     description: This endpoint retrieves all receive products from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the receive products.
 *       500:
 *         description: Internal server error.
 */

interface ReceiveData {
    MYEAR: number;
    MONTHH: number;
    REFNO: string;
    RDATE: string;
    TRDATE: string;
    SCODE: string;
    SUPPLIER_NAME: string;
    TOTAL: number;
    VAT: number;
    VAMT: number;
    GTOTAL: number;
    DIFF1: number;
    GTOTAL1: number;
    VTYPE: string;
          
}
export const dynamic = 'force-dynamic';
export const GET = async (req:NextRequest, res: NextApiResponse) => {
    try {
        const receives: ReceiveData[] = await new Promise((resolve, reject) => {
            db.query(`
            SELECT 
                RECEIVE.MYEAR,
                RECEIVE.MONTHH,
                RECEIVE.REFNO,
                RECEIVE.RDATE,
                RECEIVE.TRDATE,
                RECEIVE.SCODE,
                SUPPLIER.S_NAME AS SUPPLIER_NAME, 
                RECEIVE.TOTAL,
                RECEIVE.VAT,
                RECEIVE.VAMT,
                RECEIVE.GTOTAL,
                RECEIVE.DIFF1,
                RECEIVE.GTOTAL1,
                RECEIVE.VTYPE
            FROM 
                RECEIVE
            INNER JOIN 
                SUPPLIER ON RECEIVE.SCODE = SUPPLIER.S_ID;
            `, (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(result);
            });
        });

        

        return NextResponse.json({ receives , status: 200 });
    } catch (error) {
        console.log(error);
    }
};