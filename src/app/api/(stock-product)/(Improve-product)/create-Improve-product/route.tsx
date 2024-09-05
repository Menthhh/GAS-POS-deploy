// src/app/api/(stock-product)/(Improve-product)/create-Improve-product/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";

/**
 * @swagger
 * tags:
 *   - name: ImproveProduct
 *     description: API endpoints related to improving product management
 * 
 * /api/stock-product/Improve-product/create-Improve-product:
 *   post:
 *     summary: Create a new improve product
 *     tags: [ImproveProduct]
 *     description: This endpoint allows you to create a new improve product.
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
 *               total:
 *                 type: number
 *                 description: The total amount.
 *               selectedProducts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     pcode:
 *                       type: string
 *                       description: The product code.
 *                     qty:
 *                       type: number
 *                       description: The quantity.
 *                     uprice:
 *                       type: number
 *                       description: The unit price.
 *                     amt:
 *                       type: number
 *                       description: The amount.
 *     responses:
 *       200:
 *         description: Successfully created the improve product.
 *       500:
 *         description: Internal server error.
 */

export async function POST(req: NextRequest) {
    try {
        const formData = await req.json();
        const [year, month, day] = formData.date.split('-');
        const yearNumber = parseInt(year);  // Convert years to numbers
        const thisYear = yearNumber > 2500 ? yearNumber : yearNumber + 543; 
        const rDate = `${day}/${month}/${thisYear}`;
        
        // * Create Check Stock data for insert Database
        const checkStock = {
            MYEAR: thisYear,
            MONTH: month,
            REFNO: formData.refno,
            RDATE: rDate,
            TDATE: rDate,
            TOTAL: formData.total,
        };

        // * Create Check Stock DT data for insert Database
        const checkStockDT = formData.selectedProducts.map(( item: any, index: any ) => ({
            REFNO: formData.refno,
            P_CODE: item.pcode,
            QTY: item.qty,
            U_PRICE: item.uprice,
            AMT: item.amt,
        }));
        
        // * Insert into CHECK_STOCK table
        const sqlQueryCheckStock = `
            INSERT INTO CHECK_STOCK(
                MYEAR,
                MONTH,
                REFNO,
                RDATE,
                TDATE,
                TOTAL
            ) VALUES (
                '${checkStock.MYEAR}',
                '${checkStock.MONTH}',
                '${checkStock.REFNO}',
                '${checkStock.RDATE}',
                '${checkStock.TDATE}',
                '${checkStock.TOTAL}'
            )
        `;
        db.query(sqlQueryCheckStock, (error, result, fields) => {
            if (error) throw error;
            console.log('Inserted a new Check Stock !');
        });
         
        // * Insert into CHECK_STOCK_DT table
        checkStockDT.forEach((item: any) => {
            const sqlQueryCheckStock_DT = `
                INSERT INTO CHECK_STOCK_DT (
                    REFNO,
                    P_CODE,
                    QTY,
                    U_PRICE,
                    AMT
                ) VALUES (
                    '${item.REFNO}',
                    '${item.P_CODE}',
                    '${item.QTY}',
                    '${item.U_PRICE}',
                    '${item.AMT}'
                )
            `;
            db.query(sqlQueryCheckStock_DT, (error, results, fields) => {
              if (error) throw error;
              console.log('Inserted a new Check Stock Detail !!!');
            });
          });
        

        return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error:', error);
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
}