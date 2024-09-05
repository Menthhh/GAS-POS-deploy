// src/app/api/(supplier)/update-supplier/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";
import { supplierIdGenerator } from "@/lib/utils";

/**
 * @swagger
 * tags:
 *   - name: Supplier
 *     description: API endpoints related to supplier management
 * 
 * /api/supplier/update-supplier:
 *   put:
 *     summary: Update a supplier
 *     tags: [Supplier]
 *     description: This endpoint allows you to update an existing supplier.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplierId:
 *                 type: string
 *                 description: The ID of the supplier.
 *               supplierName:
 *                 type: string
 *                 description: The new name of the supplier.
 *               supplierContactName:
 *                 type: string
 *                 description: The new contact name of the supplier.
 *               supplierAddress:
 *                 type: string
 *                 description: The new address of the supplier.
 *               supplierPhone:
 *                 type: string
 *                 description: The new phone number of the supplier.
 *               supplierTaxId:
 *                 type: string
 *                 description: The new tax ID of the supplier.
 *     responses:
 *       200:
 *         description: Successfully updated the supplier.
 *       500:
 *         description: Internal server error.
 */

export const PUT = async (req:NextRequest, res:NextResponse) => {
  try {
    const body = await req.json();
    const {
      supplierId,
      supplierName,
      supplierContactName,
      supplierAddress,
      supplierPhone,
      supplierTaxId,
    } = body;

    console.log("supplierId", supplierId);
    console.log("supplierName", supplierName);
    console.log("supplierContactName", supplierContactName);
    console.log("supplierAddress", supplierAddress);
    console.log("supplierPhone", supplierPhone);
    console.log("supplierTaxId", supplierTaxId);

    const query = `UPDATE SUPPLIER SET S_NAME = ?, S_CONTACT_NAME = ?, S_ADDRESS = ?, S_TEL = ?, S_TAX_ID = ? WHERE S_ID = ?`;
    const params = [
      supplierName,
      supplierContactName,
      supplierAddress,
      supplierPhone,
      supplierTaxId,
      supplierId,
    ];

    const result = await new Promise((resolve, reject) =>
      db.query(query, params, (err:any, results:any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    );

    return NextResponse.json({
      message: "Supplier updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Failed to update supplier",
      status: 500,
    });
  }
};
