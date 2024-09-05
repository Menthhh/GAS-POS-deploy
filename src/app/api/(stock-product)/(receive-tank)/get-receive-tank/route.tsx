// src/app/api/(stock-product)/(receive-tank)/get-receive-tank/route.tsx
import db from "@/lib/config/db";
import { NextRequest, NextResponse } from "next/server";
import { ReceiveTankType } from "./mockData";

/**
 * @swagger
 * tags:
 *   - name: ReceiveTank
 *     description: API endpoints related to receiving tank management
 * 
 * /api/stock-product/receive-tank/get-receive-tank:
 *   get:
 *     summary: Get all receive tanks
 *     tags: [ReceiveTank]
 *     description: This endpoint retrieves all receive tanks from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the receive tanks.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 receiveTankData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       REFNO:
 *                         type: string
 *                         description: The reference number.
 *                       DATE:
 *                         type: string
 *                         description: The date of the transaction.
 *                       S_NAME:
 *                         type: string
 *                         description: The name of the supplier.
 *                       TOTAL:
 *                         type: number
 *                         description: The total amount.
 *       500:
 *         description: Internal server error.
 */
export const dynamic = 'force-dynamic';
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const receiveTankData: ReceiveTankType[] = await new Promise(
      (resolve, reject) => {
        db.query(`
          SELECT 
            rt.REFNO, 
            rt.RDATE AS DATE,
            s.S_NAME,
            rt.TOTAL
          FROM 
            RECEIVE_TANK rt
          INNER JOIN SUPPLIER s ON s.S_ID = rt.S_ID;`,
          (err: any, result: any) => {
            err ? reject(err) : resolve(result);
          }
        );
      }
    );

    return NextResponse.json({ receiveTankData: receiveTankData, status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Server error !!! Not Found",
      status: 500,
    });
  }
};
