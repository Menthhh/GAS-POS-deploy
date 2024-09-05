// src/app/api/(stock-product)/(receive-product)/update-receive/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";

/**
 * @swagger
 * tags:
 *   - name: ReceiveProduct
 *     description: API endpoints related to receiving product management
 * 
 * /api/stock-product/receive-product/update-receive:
 *   put:
 *     summary: Update a receive product
 *     tags: [ReceiveProduct]
 *     description: This endpoint allows you to update an existing receive product.
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
 *                       description: The quantity.
 *                     unitPrice:
 *                       type: number
 *                       description: The unit price.
 *                     totalPrice:
 *                       type: number
 *                       description: The total price of the product.
 *     responses:
 *       200:
 *         description: Successfully updated the receive product.
 *       500:
 *         description: Internal server error.
 */

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.json();

    const [year, month, day] = formData.date.split('-');
    const rDate = `${day}/${month}/${parseInt(year) + 543}`;
    const trDate = `${year}${month}${day}`;
    const vat = formData.taxType === 'นอก' ? 7 : formData.taxPrice;

    // Constructing the main receive object
    const receive = {
      MYEAR: year,
      MONTHH: month,
      REFNO: formData.refno,
      RDATE: rDate,
      TRDATE: trDate,
      SCODE: formData.supplierId,
      TOTAL: formData.totalBeforeTax,
      VAT: vat,
      VAMT: formData.taxPrice,
      GTOTAL: formData.totalWithTax,
      DIFF1: formData.diff,
      GTOTAL1: formData.totalPrice,
      VTYPE: formData.taxType
    };

    console.log('Receive:', receive);
    console.log('Selected Products:', formData.selectedProducts);

    // SQL query to update RECEIVE table
    const sqlQueryReceive = `
      UPDATE RECEIVE
      SET MYEAR = ${receive.MYEAR}, 
          MONTHH = ${receive.MONTHH}, 
          RDATE = '${receive.RDATE}', 
          TRDATE = '${receive.TRDATE}', 
          SCODE = '${receive.SCODE}', 
          TOTAL = ${receive.TOTAL}, 
          VAT = ${receive.VAT}, 
          VAMT = ${receive.VAMT}, 
          GTOTAL = ${receive.GTOTAL}, 
          DIFF1 = ${receive.DIFF1}, 
          GTOTAL1 = ${receive.GTOTAL1}, 
          VTYPE = '${receive.VTYPE}'
      WHERE REFNO = '${receive.REFNO}'
    `;

    // SQL query to delete products from RECEIVE_DT table
    const sqlQueryDeleteProducts = `
      DELETE FROM RECEIVE_DT WHERE REFNO = '${receive.REFNO}'
    `;

    // Constructing the products array
    const products = formData.selectedProducts.map((product) => {
      return `('${receive.REFNO}', '${product.pid}', ${product.qty}, ${product.unitPrice}, ${product.totalPrice})`;
    });

    // SQL query to insert products into RECEIVE_DT table
    const sqlQueryProducts = `
      INSERT INTO RECEIVE_DT (REFNO, PCODE, QTY, UPRICE, AMT)
      VALUES ${products.join(', ')}
    `;

    // Using Promises to ensure sequential execution
    await new Promise((resolve, reject) => {
      // Delete products first
      db.query(sqlQueryDeleteProducts, (error, results, fields) => {
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
      // Update RECEIVE table
      db.query(sqlQueryReceive, (error, results, fields) => {
        if (error) {
          console.error('Error updating RECEIVE:', error);
          reject(error);
        } else {
          console.log('Updated RECEIVE successfully!');
          resolve(results);
        }
      });
    });

    await new Promise((resolve, reject) => {
      // Insert new products
      db.query(sqlQueryProducts, (error, results, fields) => {
        if (error) {
          console.error('Error inserting products:', error);
          reject(error);
        } else {
          console.log('Inserted products successfully!');
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
