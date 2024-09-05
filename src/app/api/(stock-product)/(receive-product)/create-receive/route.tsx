// src/app/api/(stock-product)/(receive-product)/create-receive/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";

/**
 * @swagger
 * tags:
 *   - name: ReceiveProduct
 *     description: API endpoints related to receiving product management
 * 
 * /api/stock-product/receive-product/create-receive:
 *   post:
 *     summary: Create a new receive product
 *     tags: [ReceiveProduct]
 *     description: This endpoint allows you to create a new receive product.
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
 *         description: Successfully created the receive product.
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
    const trDate = `${thisYear}${month}${day}`;
    const vat = formData.taxType === 'นอก' ? 7 : formData.taxPrice;

    // Constructing the main receive object
    const receive = {
      MYEAR: year,                     // Transaction year, e.g., '2024'
      MONTHH: month,                   // Transaction month, e.g., '06'
      REFNO: formData.refno,           // Receipt number, e.g., '23432432'
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

    // Creating receive_dt array for selected products
    const receive_dt = formData.selectedProducts.map((product: any, index: any) => ({
      REFNO: formData.refno,           // Receipt number
      PCODE: product.pid,              // Product code
      QTY: product.qty,                // Quantity of the product
      UPRICE: product.unitPrice,       // Unit price of the product
      AMT: product.totalPrice          // Total price of the product
    }));

    const sqlQueryReceive = `
      INSERT INTO RECEIVE (MYEAR, MONTHH, REFNO, RDATE, TRDATE, SCODE, TOTAL, VAT, VAMT, GTOTAL, DIFF1, GTOTAL1, VTYPE)
      VALUES (${receive.MYEAR}, ${receive.MONTHH}, '${receive.REFNO}', '${receive.RDATE}', '${receive.TRDATE}', '${receive.SCODE}', ${receive.TOTAL}, ${receive.VAT}, ${receive.VAMT}, ${receive.GTOTAL}, ${receive.DIFF1}, ${receive.GTOTAL1}, '${receive.VTYPE}')
    `;
    db.query(sqlQueryReceive, (error, results, fields) => {
      if (error) throw error;
      console.log('Inserted a new Receive !');
    });

    receive_dt.forEach((item: any) => {
      const sqlQueryReceive_dt = `
        INSERT INTO RECEIVE_DT (REFNO, PCODE, QTY, UPRICE, AMT)
        VALUES ('${item.REFNO}', '${item.PCODE}', ${item.QTY}, ${item.UPRICE}, ${item.AMT})
      `;
      db.query(sqlQueryReceive_dt, (error, results, fields) => {
        if (error) throw error;
        console.log('Inserted a new Receive Detail !!!');
      });
    });

    return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}