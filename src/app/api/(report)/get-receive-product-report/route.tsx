// src/app/api/(report)/get-receive-product-report/route.tsx
import db from "@/lib/config/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   - name: Report
 *     description: API endpoints related to reporting operations
 * 
 * /api/report/get-receive-product-report:
 *   get:
 *     summary: Get receive product report
 *     tags: [Report]
 *     description: This endpoint retrieves the receive product report, grouping data by REFNO.
 *     responses:
 *       200:
 *         description: Successfully retrieved the receive product report.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 REPORT:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       RDATE:
 *                         type: string
 *                         description: The date of the report.
 *                       REFNO:
 *                         type: string
 *                         description: The reference number.
 *                       S_NAME:
 *                         type: string
 *                         description: The supplier name.
 *                       TOTAL:
 *                         type: number
 *                         description: The total amount.
 *                       VAMT:
 *                         type: number
 *                         description: The VAT amount.
 *                       GTOTAL:
 *                         type: number
 *                         description: The grand total.
 *                       DIFF1:
 *                         type: number
 *                         description: The difference amount.
 *                       GTOTAL1:
 *                         type: number
 *                         description: The final grand total.
 *                       PRODUCTS:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             P_NAME:
 *                               type: string
 *                               description: The product name.
 *                             QUANTITY:
 *                               type: number
 *                               description: The quantity of the product.
 *                             UPRICE:
 *                               type: number
 *                               description: The unit price of the product.
 *                             TOTAL_AMOUNT:
 *                               type: number
 *                               description: The total amount for the product.
 *       500:
 *         description: Server error.
 */

interface ProductType {
  P_NAME: string;
  QUANTITY: number;
  UPRICE: number;
  TOTAL_AMOUNT: number;
}

interface ReportType {
  RDATE: string;
  REFNO: string;
  S_NAME: string;
  TOTAL: number;
  VAMT: number;
  GTOTAL: number;
  DIFF1: number;
  GTOTAL1: number;
  PRODUCTS: ProductType[];
}
export const dynamic = 'force-dynamic';
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const rows: any[] = await new Promise((resolve, reject) => {
      db.query(`
        SELECT
          r.RDATE,
          r.REFNO,
          r.SCODE AS S_NAME,
          d.PCODE AS P_NAME,
          d.QTY AS QUANTITY,
          d.UPRICE,
          d.AMT AS TOTAL_AMOUNT,
          r.TOTAL,
          r.VAMT,
          r.GTOTAL,
          r.DIFF1,
          r.GTOTAL1
        FROM
          RECEIVE r
        JOIN
          RECEIVE_DT d
        ON
          r.REFNO = d.REFNO
      `, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    // Process the data to group by REFNO
    const reportData: { [key: string]: ReportType } = {};

    rows.forEach(row => {
      const refno = row.REFNO;
      if (!reportData[refno]) {
        reportData[refno] = {
          RDATE: row.RDATE,
          REFNO: refno,
          S_NAME: row.S_NAME,
          TOTAL: row.TOTAL,
          VAMT: row.VAMT,
          GTOTAL: row.GTOTAL,
          DIFF1: row.DIFF1,
          GTOTAL1: row.GTOTAL1,
          PRODUCTS: []
        };
      }
      reportData[refno].PRODUCTS.push({
        P_NAME: row.P_NAME,
        QUANTITY: row.QUANTITY,
        UPRICE: row.UPRICE,
        TOTAL_AMOUNT: row.TOTAL_AMOUNT,
      });
    });

    const formattedReportData = Object.values(reportData);

    return NextResponse.json({ REPORT: formattedReportData, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Server error !!! Not Found",
      status: 500,
    });
  }
};
