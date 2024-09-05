// src/app/api/(supplier)/export-supplier-csv/route.tsx
import db from "@/lib/config/db";
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: Supplier
 *     description: API endpoints related to supplier management
 * 
 * /api/supplier/export-supplier-csv:
 *   get:
 *     summary: Export supplier data to CSV
 *     tags: [Supplier]
 *     description: This endpoint exports all supplier data to CSV format.
 *     responses:
 *       200:
 *         description: Successfully exported the supplier data.
 *       500:
 *         description: Internal server error.
 */

interface ISupplier {
  S_ID: string;
  S_NAME: string;
  S_CONTACT_NAME: string;
  S_ADDRESS: string;
  S_TEL: string;
  S_TAX_ID: string;
}

export const GET = async (req:NextRequest, res:NextResponse) => {
  try {
    // Fetch all products from the database
    const suppliers: ISupplier[] = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM SUPPLIER', (err: string, results: ISupplier[]) => {
          if (err) {
              reject(err);
          } else {
              resolve(results);
          }
      });
  });

    // Format the data to exclude P_IMAGE and include it in the desired format
    const suppliersCSV = suppliers.map((supplier) => {
      return {
        "รหัสผู้จัดจำหน่าย": supplier.S_ID,
        "ชื่อผู้จัดจำหน่าย": supplier.S_NAME,
        "ชื่อผู้ติดต่อ": supplier.S_CONTACT_NAME,
        "ที่อยู่": supplier.S_ADDRESS,
        "เบอร์โทร": supplier.S_TEL,
        "เลขประจำตัวผู้เสียภาษี": supplier.S_TAX_ID,
      };
    });

    return NextResponse.json({ suppliersCSV: suppliersCSV, status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
};
