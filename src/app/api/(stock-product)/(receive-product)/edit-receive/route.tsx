// src/app/api/(stock-product)/(receive-product)/edit-receive/route.tsx
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/config/db";

/**
 * @swagger
 * tags:
 *   - name: ReceiveProduct
 *     description: API endpoints related to receiving product management
 * 
 * /api/stock-product/receive-product/edit-receive:
 *   post:
 *     summary: Edit a receive product
 *     tags: [ReceiveProduct]
 *     description: This endpoint allows you to edit an existing receive product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 description: The date of the transaction.
 *                 example: "2023-05-23"
 *               refno:
 *                 type: string
 *                 description: The reference number.
 *               supplierId:
 *                 type: string
 *                 description: The ID of the supplier.
 *               totalBeforeTax:
 *                 type: number
 *                 description: The total amount before tax.
 *               taxPrice:
 *                 type: number
 *                 description: The tax amount.
 *               totalWithTax:
 *                 type: number
 *                 description: The total amount after tax.
 *               diff:
 *                 type: number
 *                 description: The difference amount.
 *               totalPrice:
 *                 type: number
 *                 description: The total amount overall.
 *               taxType:
 *                 type: string
 *                 description: The type of tax (e.g., 'นอก').
 *     responses:
 *       200:
 *         description: Successfully edited the receive product.
 *       500:
 *         description: Internal server error.
 */

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const formData = await req.json();

        const [year, month, day] = formData.date.split('-');
        const rDate = `${day}/${month}/${year}`;
        const trDate = `${year}${month}${day}`;
        const vat = formData.taxType === 'นอก' ? 7 : formData.taxPrice;

        // Constructing the main receive object
        const receive = {
            MYEAR: year,                     // Transaction year, e.g., '2024'
            MONTHH: month,                   // Transaction month, e.g., '06'
            REFNO: formData.refno,         // Receipt number, e.g., '23432432'
            RDATE: rDate,                    // Receipt date in 'DD/MM/YYYY' format, e.g., '28/06/2024'
            TRDATE: trDate,                  // Receipt date in 'YYYYMMDD' format, e.g., '20240628'
            SCODE: formData.supplierId,          // Seller code, e.g., 'seller1'
            TOTAL: formData.totalBeforeTax,  // Total amount before tax, e.g., 400
            VAT: vat,                        // VAT amount, e.g., 28.00
            VAMT: formData.taxPrice,         // Tax amount (same as VAT in this case)
            GTOTAL: formData.totalWithTax,   // Total amount after tax, e.g., 428
            DIFF1: formData.diff,
            GTOTAL1: formData.totalPrice,    // Total amount overall, e.g., 428
            VTYPE: formData.taxType          // Tax type, e.g., 'นอก'
        };

        console.log('Received formData:', formData);
        console.log('Receive:', receive);

        try {
            const sqlUpdate = `
                    UPDATE GasAPI.RECEIVE
                        SET
                            MYEAR = '${receive.MYEAR}',
                            MONTHH = '${receive.MONTHH}',
                            REFNO = '${receive.REFNO}',
                            RDATE = '${receive.RDATE}',
                            TRDATE = '${receive.TRDATE}',
                            SCODE = '${receive.SCODE}',
                            TOTAL = '${receive.TOTAL}',
                            VAT = '${receive.VAT}',
                            VAMT = '${receive.VAMT}',
                            GTOTAL = '${receive.GTOTAL}',
                            DIFF1 = '${receive.DIFF1}',
                            GTOTAL1 = '${receive.GTOTAL1}',
                            VTYPE = '${receive.VTYPE}'
                        WHERE 
                            REFNO = '${receive.REFNO}';
                            `
            await new Promise((resolve, rejects) => {
                db.query(sqlUpdate, (err: any, result: any) => {
                    err ? rejects(err) : resolve(result);
                });
            });
        } catch (error) {
            console.error('Failed update to database server:', error);
            return NextResponse.json({
                message: "Update receive Fail !!! (Server Database)",
                status: 500,
            });
        }
    } catch (error) {
        console.error('Failed to parse JSON:', error);
        return NextResponse.json({
            message: "Update receive Fail !!! (formData)",
            status: 500,
        });
    }
};
