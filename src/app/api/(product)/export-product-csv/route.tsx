// src/app/api/(product)/export-product-csv/route.tsx
import db from "@/lib/config/db";
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: API endpoints related to product operations
 * 
 * /api/product/export-product-csv:
 *   get:
 *     summary: Export products to CSV
 *     tags: [Product]
 *     description: This endpoint exports all products data to CSV format.
 *     responses:
 *       200:
 *         description: Successfully exported the products data.
 *       500:
 *         description: Internal server error.
 */

interface Product {
  P_ID: string;
  P_NAME: string;
  P_TYPE: string;
  P_UNIT: string;
  P_UNIT_AMOUNT: number;
  P_STATUS: string;
  RETAIL_PRICE: number;
  WHOLE_PRICE: number;
  NOTIFICATION_AMOUNT: number;
  P_IMAGE: string;
}

export const dynamic = 'force-dynamic';
export const GET = async (req:NextRequest, res:NextResponse) => {
  try {
    // Query to fetch all data from the PRODUCT table
    const products: Product[] = await new Promise((resolve, reject) => {
      db.query(`
      SELECT 
          P_ID, 
          P_NAME, 
          P_TYPE, 
          P_UNIT, 
          P_UNIT_AMOUNT, 
          P_STATUS, 
          RETAIL_PRICE, 
          WHOLE_PRICE, 
          NOTIFICATION_AMOUNT, 
          P_IMAGE
      FROM 
          PRODUCT
      `, (err: any, result: any) => {
          if (err) {
              console.log(err);
              reject(err);
          }
          resolve(result);
      });
  });

    // Format the data to exclude P_IMAGE and include it in the desired format
    // const formattedData = products.map(row => ({
    //   name: row.P_NAME,
    //   type: row.P_TYPE,
    //   unit: row.P_UNIT,
    //   unitAmount: row.P_UNIT_AMOUNT,
    //   status: row.P_STATUS,
    //   retailPrice: row.RETAIL_PRICE,
    //   wholesalePrice: row.WHOLE_PRICE,
    //   notificationAmount: row.NOTIFICATION_AMOUNT
    // }));

    //change to Thai format
    const formattedData = products.map(row => ({
      "ชื่อสินค้า": row.P_NAME,
      "ประเภท": row.P_TYPE,
      "หน่วย": row.P_UNIT,
      "จำนวนต่อหน่วย": row.P_UNIT_AMOUNT,
      "สถานะ": row.P_STATUS,
      "ราคาขายปลีก": row.RETAIL_PRICE,
      "ราคาขายส่ง": row.WHOLE_PRICE,
  }));
  

    

    // Return the formatted data as JSON
    return NextResponse.json({products: formattedData, status: 200});
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
};
