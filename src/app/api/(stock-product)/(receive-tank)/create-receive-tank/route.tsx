// src/app/api/(stock-product)/(receive-tank)/create-receive-tank/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";

/**
 * @swagger
 * tags:
 *   - name: ReceiveTank
 *     description: API endpoints related to receiving tank management
 * 
 * /api/stock-product/receive-tank/create-receive-tank:
 *   post:
 *     summary: Create a new receive tank
 *     tags: [ReceiveTank]
 *     description: This endpoint allows you to create a new receive tank.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 description: The date of the transaction in format YYYY-MM-DD.
 *                 example: "2023-05-23"
 *               refno:
 *                 type: string
 *                 description: The reference number.
 *               supplierId:
 *                 type: string
 *                 description: The ID of the supplier.
 *               totalPrice:
 *                 type: number
 *                 description: The total price of the transaction.
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
 *                       description: The quantity of the product.
 *                     unitPrice:
 *                       type: number
 *                       description: The unit price of the product.
 *                     totalPrice:
 *                       type: number
 *                       description: The total price of the product.
 *     responses:
 *       201:
 *         description: Successfully created the receive tank.
 *       500:
 *         description: Internal server error.
 */

export async function POST(req: NextRequest) {
    try {
        const formData = await req.json();
        console.log(formData);
        const [year, month, day] = formData.date.split('-');
        const yearNumber = parseInt(year);  // Convert years to numbers
        const thisYear = yearNumber > 2500 ? yearNumber : yearNumber + 543; 
        const rDate = `${day}/${month}/${thisYear}`;
        
        // * Create Receive Tank data for insert Database
        const receiveTank = {
            MYEAR: thisYear,
            MONTH: month,
            REFNO: formData.refno,
            RDATE: rDate,
            TDATE: rDate,
            S_ID: formData.supplierId,
            TOTAL: formData.totalPrice,
        };

        // * Create Receive TankDT data for insert Database
        const receiveTankDT = formData.selectedProducts.map(( item: any, index: any ) => ({
            REFNO: formData.refno,
            P_CODE: item.pcode,
            QTY: item.qty,
            U_PRICE: item.unitPrice,
            AMT: item.totalPrice,
        }));
        console.log(receiveTankDT);
        
        // * Insert into RECEIVE_TANK table
        const sqlQueryReceiveTank = `
            INSERT INTO RECEIVE_TANK(
                MYEAR,
                MONTH,
                REFNO,
                RDATE,
                TDATE,
                S_ID,
                TOTAL
            ) VALUES (
                '${receiveTank.MYEAR}',
                '${receiveTank.MONTH}',
                '${receiveTank.REFNO}',
                '${receiveTank.RDATE}',
                '${receiveTank.TDATE}',
                '${receiveTank.S_ID}',
                '${receiveTank.TOTAL}'
            )
        `;
        db.query(sqlQueryReceiveTank, (error, result, fields) => {
            if (error) throw error;
            console.log('Inserted a new Check Stock !');
        });
         
        // * Insert into RECEIVE_TANK_DT table
        receiveTankDT.forEach((item: any) => {
            const sqlQueryReceiveTankDT = `
                INSERT INTO RECEIVE_TANK_DT (
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
            db.query(sqlQueryReceiveTankDT, (error, results, fields) => {
              if (error) throw error;
              console.log('Inserted a new Check Stock Detail !!!');
            });
          });

        return NextResponse.json({ message: 'Form submitted successfully' }, { status: 201 });
    } catch (error) {
      console.error('Error:', error);
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
}