// src/app/api/(stock-product)/(receive-tank)/update-receive-tank/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";

/**
 * @swagger
 * tags:
 *   - name: ReceiveTank
 *     description: API endpoints related to receiving tank management
 * 
 * /api/stock-product/receive-tank/update-receive-tank:
 *   put:
 *     summary: Update a receive tank
 *     tags: [ReceiveTank]
 *     description: This endpoint allows you to update an existing receive tank.
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
 *                     pid:
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
 *       200:
 *         description: Successfully updated the receive tank.
 *       500:
 *         description: Internal server error.
 */

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.json();

    const [year, month, day] = formData.date.split('-');
    const yearNumber = parseInt(year);  // Convert years to numbers
    const thisYear = yearNumber > 2500 ? yearNumber : yearNumber + 543; 
    const rDate = `${day}/${month}/${thisYear}`;
    const trDate = `${day}/${month}/${thisYear}`;
    const vat = formData.taxType === 'นอก' ? 7 : formData.taxPrice;

    // Constructing the main receive tank object
    const receiveTank = {
      MYEAR: thisYear,
      MONTH: month,
      REFNO: formData.refno,
      RDATE: rDate,
      TDATE: rDate,
      S_ID: formData.supplierId,
      TOTAL: formData.totalPrice,
  };

    console.log('Receive Tank:', receiveTank);
    console.log('Selected Products:', formData.selectedProducts);

    // SQL query to update RECEIVE_TANK table
    const sqlQueryReceiveTank = `
      UPDATE 
        RECEIVE_TANK
      SET 
        MYEAR = ${receiveTank.MYEAR},
        MONTH = ${receiveTank.MONTH},
        RDATE = ${receiveTank.RDATE},
        TDATE = ${receiveTank.TDATE},
        S_ID  = ${receiveTank.S_ID},
        TOTAL = ${receiveTank.TOTAL}
      WHERE 
        REFNO = '${receiveTank.REFNO}'
    `;

    // SQL query to delete products from RECEIVE_TANK_DT table
    const sqlQueryDeleteProductsReceiveTankDT = `
      DELETE FROM RECEIVE_TANK_DT WHERE REFNO = '${receiveTank.REFNO}'
    `;

    // Constructing the products array
    const productsReceiveTankDT = formData.selectedProducts.map(( item: any ) => {
      return `('${receiveTank.REFNO}', '${item.pid}', ${item.qty}, ${item.unitPrice}, ${item.totalPrice})`;
    });

    // SQL query to insert products into RECEIVE_DT table
    const sqlQueryReceiveTankDT = `
      INSERT INTO RECEIVE_TANK_DT (REFNO, P_CODE, QTY, U_PRICE, AMT)
      VALUES ${productsReceiveTankDT.join(', ')}
    `;

    // Using Promises to ensure sequential execution
    await new Promise((resolve, reject) => {
      // Delete products first
      db.query(sqlQueryDeleteProductsReceiveTankDT, (error, results, fields) => {
        if (error) {
          console.error('Error deleting products:', error);
          reject(error);
        } else {
          console.log('Deleted products successfully!');
          resolve(results);
        }
      });
    });

    await new Promise((resolve, reject) => {
      // Update RECEIVE_TANK table
      db.query(sqlQueryReceiveTank, (error, results, fields) => {
        if (error) {
          console.error('Error updating Receive Tank:', error);
          reject(error);
        } else {
          console.log('Updated Receive Tank successfully!');
          resolve(results);
        }
      });
    });

    await new Promise((resolve, reject) => {
      // Insert new Receive Tank DT
      db.query(sqlQueryReceiveTankDT, (error, results, fields) => {
        if (error) {
          console.error('Error inserting Receive Tank DT:', error);
          reject(error);
        } else {
          console.log('Inserted Receive Tank DT successfully!');
          resolve(results);
        }
      });
    });

    // Respond with success message
    return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
