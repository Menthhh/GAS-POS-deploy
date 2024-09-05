// src/app/api/(stock-product)/(receive-product)/get-receive/[refno]/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';
import type { Receive } from '@/app/model/receive.type';

/**
 * @swagger
 * tags:
 *   - name: ReceiveProduct
 *     description: API endpoints related to receiving product management
 * 
 * /api/stock-product/receive-product/get-receive/{refno}:
 *   get:
 *     summary: Get a specific receive product by reference number
 *     tags: [ReceiveProduct]
 *     description: This endpoint retrieves a specific receive product based on its reference number.
 *     parameters:
 *       - in: path
 *         name: refno
 *         schema:
 *           type: string
 *         required: true
 *         description: The reference number of the receive product.
 *     responses:
 *       200:
 *         description: Successfully retrieved the receive product.
 *       500:
 *         description: Internal server error.
 */

type SelectedProduct = {
    refno: string;
    pid: number;
    name: string;
    qty: number;
    unitPrice: number;
    totalPrice: number;
};

type receieveData = {
    refno: string;
    date: string;
    supplierId: string;
    selectedProducts: SelectedProduct[];
    taxType: string;
    totalBeforeTax: number;
    taxPrice: number;
    diff: number;
    totalWithTax: number;
    totalPrice: number;
};


export const dynamic = 'force-dynamic'
export const GET = async (req: NextRequest, { params }: { params: { refno: string } }) => {
    const refno = params.refno;
    try {
        // const receive = await new Promise((resolve, reject) => {
        //     db.query(`
        // SELECT 
        //     r.REFNO,
        //     r.RDATE,
        //     r.TRDATE,
        //     s.S_ID,
        //     s.S_NAME,
        //     r.TOTAL,
        //     r.VAT,
        //     r.VAMT,
        //     r.GTOTAL,
        //     r.DIFF1,
        //     r.GTOTAL1,
        //     r.VTYPE,
        //     rd.PCODE,
        //     rd.PCODE,
        //     p.P_NAME,
        //     rd.QTY,
        //     rd.UPRICE,
        //     rd.AMT
        // FROM RECEIVE r
        // JOIN SUPPLIER s ON r.SCODE = s.S_ID
        // JOIN RECEIVE_DT rd ON r.REFNO = rd.REFNO
        // JOIN PRODUCT p ON rd.PCODE = p.P_ID
        // WHERE r.REFNO = ${refno};
        // `, (err: any, result: any) => {
        //         if (err) {
        //             console.log(err);
        //             reject(err);
        //         }
        //         resolve(result);
        //     });
        // });

        const receive : Receive[] = await new Promise((resolve, reject) => {
            db.query(`
            SELECT 
                r.REFNO,
                r.RDATE,
                r.TRDATE,
                s.S_ID,
                s.S_NAME,
                r.TOTAL,
                r.VAT,
                r.VAMT,
                r.GTOTAL,
                r.DIFF1,
                r.GTOTAL1,
                r.VTYPE,
                rd.PCODE,
                p.P_NAME,
                rd.QTY,
                rd.UPRICE,
                rd.AMT
            FROM RECEIVE r
            JOIN SUPPLIER s ON r.SCODE = s.S_ID
            JOIN RECEIVE_DT rd ON r.REFNO = rd.REFNO
            JOIN PRODUCT p ON rd.PCODE = p.P_ID
            WHERE r.REFNO = ${refno};
            `, (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(result);
            });
        });

        const selectedProducts: SelectedProduct[] = receive.map((product: any) => {
            return {
                refno: product.REFNO,
                pid: product.PCODE,
                name: product.P_NAME,
                qty: product.QTY,
                unitPrice: product.UPRICE,
                totalPrice: product.AMT
            };
        });

        const receiveData: receieveData = {
            refno: receive[0].REFNO,
            date: receive[0].RDATE,
            supplierId: receive[0].S_ID,
            selectedProducts: selectedProducts,
            taxType: receive[0].VTYPE,
            totalBeforeTax: receive[0].TOTAL,
            taxPrice: receive[0].VAMT,
            diff: receive[0].DIFF1,
            totalWithTax: receive[0].GTOTAL,
            totalPrice: receive[0].GTOTAL1
        };

        return NextResponse.json({ receiveData, status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500 });
    }
};