// src/app/api/(stock-product)/(Improve-product)/update-Improve-product/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";

/**
 * @swagger
 * tags:
 *   - name: ImproveProduct
 *     description: API endpoints related to improving product management
 * 
 * /api/stock-product/Improve-product/update-Improve-product:
 *   put:
 *     summary: Update an improve product
 *     tags: [ImproveProduct]
 *     description: This endpoint allows you to update an existing improve product.
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
 *         description: Successfully updated the improve product.
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

    // Constructing the main Check Stock object
    const checkStock = {
      MYEAR: thisYear,
      MONTH: month,
      REFNO: formData.refno,
      RDATE: rDate,
      TDATE: rDate,
      TOTAL: formData.total,
    };

    console.log('Check Stock:', checkStock);
    console.log('Selected Data Row:', formData.selectedProducts);

    // SQL query to update CHECK_STOCK table
    const sqlQueryCheckSTock = `
      UPDATE CHECK_STOCK
      SET 
        MYEAR = ${checkStock.MYEAR},
        MONTH = ${checkStock.MONTH},
        RDATE = ${checkStock.RDATE},
        TDATE = ${checkStock.TDATE},
        TOTAL= ${checkStock.TOTAL}
      WHERE 
        REFNO = '${checkStock.REFNO}'
    `;

    // SQL query to delete products from CHECK_STOCK_DT table
    const sqlQueryDeleteCheckStockDT = `
      DELETE FROM CHECK_STOCK_DT WHERE REFNO = '${checkStock.REFNO}'
    `;

    // Constructing the products array
    const detailCheckStockData = formData.selectedProducts.map((item: any) => {
      return `('${checkStock.REFNO}', '${item.pcode}', ${item.qty}, ${item.uprice}, ${item.amt})`;
    });
    
    // SQL query to insert products into RECEIVE_DT table
    const sqlQueryCHECK_STOCK_DT = `
      INSERT INTO CHECK_STOCK_DT (REFNO, P_CODE, QTY, U_PRICE, AMT)
      VALUES ${detailCheckStockData.join(', ')}
    `;

    // Using Promises to ensure sequential execution
    await new Promise((resolve, reject) => {
      // Delete products first
      db.query(sqlQueryDeleteCheckStockDT, (error, results, fields) => {
        if (error) {
          console.error('Error deleting Check Stock DT:', error);
          reject(error);
        } else {
          console.log('Deleted Check Stock DT successfully!');
          resolve(results);
        }
      });
    });

    await new Promise((resolve, reject) => {
      // Update Check STock table
      db.query(sqlQueryCheckSTock, (error, results, fields) => {
        if (error) {
          console.error('Error updating Check STock:', error);
          reject(error);
        } else {
          console.log('Updated Check STock successfully!');
          resolve(results);
        }
      });
    });

    await new Promise((resolve, reject) => {
      // Insert new products
      db.query(sqlQueryCHECK_STOCK_DT, (error, results, fields) => {
        if (error) {
          console.error('Error inserting Check Stock DT:', error);
          reject(error);
        } else {
          console.log('Inserted Check Stock DT successfully!');
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
