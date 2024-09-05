// src/app/api/(supplier)/create-supplier/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";
import { supplierIdGenerator } from "@/lib/utils";

/**
 * @swagger
 * tags:
 *   - name: Supplier
 *     description: API endpoints related to supplier management
 * 
 * /api/supplier/create-supplier:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Supplier]
 *     description: This endpoint allows you to create a new supplier.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplierName:
 *                 type: string
 *                 description: The name of the supplier.
 *               supplierContactName:
 *                 type: string
 *                 description: The contact name of the supplier.
 *               supplierAddress:
 *                 type: string
 *                 description: The address of the supplier.
 *               supplierPhone:
 *                 type: string
 *                 description: The phone number of the supplier.
 *               supplierTaxId:
 *                 type: string
 *                 description: The tax ID of the supplier.
 *     responses:
 *       200:
 *         description: Successfully created the supplier.
 *       500:
 *         description: Internal server error.
 */

export const POST = async (req:NextRequest, res:NextResponse) => {
  try {
    const body = await req.json();
    const {
      supplierName,
      supplierContactName,
      supplierAddress,
      supplierPhone,
      supplierTaxId,
    } = body;

    console.log("supplierName", supplierName);
    console.log("supplierContactName", supplierContactName);
    console.log("supplierAddress", supplierAddress);
    console.log("supplierPhone", supplierPhone);
    console.log("supplierTaxId", supplierTaxId);

    // Generate supplier ID
    const supplierId = await supplierIdGenerator();

    // Prepare SQL query parameters
    const query = `INSERT INTO SUPPLIER (S_ID,  S_NAME, S_CONTACT_NAME, S_ADDRESS, S_TEL, S_TAX_ID) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [supplierId, supplierName, supplierContactName,  supplierAddress, supplierPhone, supplierTaxId];

    const result = await new Promise((resolve, reject) => {
      db.query(query, params, (err:any, results:any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    return NextResponse.json({ message: "Supplier created successfully", status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create supplier", status: 500 });
  }
};
