// src/app/api/(stock-product)/(Improve-product)/get-Improve-product/route.tsx
import db from "@/lib/config/db";
import { NextRequest, NextResponse } from "next/server";
import { Improve, ImproveDt, ImproveData, ImproveDtData, ImproveType } from "./mockData";

/**
 * @swagger
 * tags:
 *   - name: ImproveProduct
 *     description: API endpoints related to improving product management
 * 
 * /api/stock-product/Improve-product/get-Improve-product:
 *   get:
 *     summary: Get all improve products
 *     tags: [ImproveProduct]
 *     description: This endpoint retrieves all improve products from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the improve products.
 *       500:
 *         description: Internal server error.
 */
export const dynamic = 'force-dynamic';
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const improveData: ImproveType[] = await new Promise(
      (resolve, reject) => {
        db.query(`SELECT ckt.REFNO, ckt.RDATE AS DATE FROM CHECK_STOCK ckt;`,
          (err: any, result: any) => {
            err ? reject(err) : resolve(result);
          }
        );
      }
    );

    // return NextResponse.json({
    //   checkStockData: ImproveData,
    //   checkStockDTData: ImproveDtData,
    //   status: 200,
    // });

    return NextResponse.json({ checkStockData: improveData, status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Server error !!! Not Found",
      status: 500,
    });
  }
};
