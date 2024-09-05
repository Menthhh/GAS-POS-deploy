// src/app/api/(supplier)/get-history-buy/route.tsx
import db from "@/lib/config/db";
import { NextRequest, NextResponse } from "next/server";
import mockData from "@/app/api/(supplier)/get-history-buy/mockData.json";

/**
 * @swagger
 * tags:
 *   - name: Supplier
 *     description: API endpoints related to supplier management
 * 
 * /api/supplier/get-history-buy:
 *   get:
 *     summary: Get purchase history
 *     tags: [Supplier]
 *     description: This endpoint retrieves the purchase history of suppliers.
 *     responses:
 *       200:
 *         description: Successfully retrieved the purchase history.
 *       500:
 *         description: Internal server error.
 */

interface historySupplier {
  BILL_NUMBER: string;
  S_NAME: string;
  P_NAME: string;
  QUANTITY: string;
  UPRICE: string;
  TOTAL: string;
}
export const dynamic = 'force-dynamic';
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const historyData: historySupplier[] = await new Promise(
      (resolve, reject) => {
        db.query(`
              SELECT 
                r.REFNO AS BILL_NUMBER, 
                s.S_NAME,
                r.RDATE AS DATE,
                p.P_NAME,
                rd.QTY AS QUANTITY,
                rd.UPRICE,
                rd.AMT AS TOTAL
              FROM
                RECEIVE_DT rd
              INNER JOIN RECEIVE r ON rd.REFNO = r.REFNO
              INNER JOIN SUPPLIER s ON s.S_ID = r.SCODE
              INNER JOIN PRODUCT p ON rd.PCODE = p.P_ID;`,
          (err: any, result: any) => {
            err ? reject(err) : resolve(result);
          }
        );
      }
    );
    // console.log(historyData);

    return NextResponse.json({historySupplier: historyData, status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Server error !!! Not Found",
      status: 500,
    });
  }
};
