// src/app/api/(report)/get-tax-report/route.tsx
import db from "@/lib/config/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   - name: Report
 *     description: API endpoints related to reporting operations
 * 
 * /api/report/get-tax-report:
 *   get:
 *     summary: Get tax report
 *     tags: [Report]
 *     description: This endpoint retrieves the tax report, including supplier tax IDs.
 *     responses:
 *       200:
 *         description: Successfully retrieved the tax report.
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
 *                       S_TAX_ID:
 *                         type: string
 *                         description: The supplier tax ID.
 *                       TOTAL:
 *                         type: number
 *                         description: The total amount.
 *                       VAMT:
 *                         type: number
 *                         description: The VAT amount.
 *       500:
 *         description: Server error.
 */

interface ReportType {
  RDATE: string;
  REFNO: string;
  S_NAME: string;
  S_TAX_ID: string;
  TOTAL: number;
  VAMT: number;
}
export const dynamic = 'force-dynamic';
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const reportData: ReportType[] = await new Promise((resolve, reject) => {
      db.query(`
        SELECT
          r.RDATE,
          r.REFNO,
          s.S_NAME,
          s.S_TAX_ID,
          r.TOTAL,
          r.VAMT
        FROM
          RECEIVE r
        JOIN
          SUPPLIER s
        ON
          r.SCODE = s.S_ID
        ORDER BY
          r.RDATE, r.REFNO;
      `, (err, result) => {
        if (err) {
          console.error("Database query error:", err);
          reject(err);
        } else {
          console.log("Database query result:", result);
          resolve(result);
        }
      });
    });

    return NextResponse.json({ REPORT: reportData, status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({
      message: "Server error !!! Not Found",
      status: 500,
    });
  }
};
