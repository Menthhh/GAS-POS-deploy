// src/app/api/(supplier)/submit-supplier-csv/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";
import { supplierIdGenerator } from "@/lib/utils";

/**
 * @swagger
 * tags:
 *   - name: Supplier
 *     description: API endpoints related to supplier management
 * 
 * /api/supplier/submit-supplier-csv:
 *   post:
 *     summary: Submit supplier data via CSV
 *     tags: [Supplier]
 *     description: This endpoint allows you to submit supplier data via CSV file.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               suppliers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     supplierName:
 *                       type: string
 *                       description: The name of the supplier.
 *                     supplierContactName:
 *                       type: string
 *                       description: The contact name of the supplier.
 *                     supplierAddress:
 *                       type: string
 *                       description: The address of the supplier.
 *                     supplierPhone:
 *                       type: string
 *                       description: The phone number of the supplier.
 *                     supplierTaxId:
 *                       type: string
 *                       description: The tax ID of the supplier.
 *     responses:
 *       200:
 *         description: Successfully submitted the supplier data.
 *       400:
 *         description: Invalid request body. Expected an array of suppliers.
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

export const POST = async (req:NextRequest, res:NextResponse) => {
  try {
    const body = await req.json();
    const { suppliers } = body;
    console.log(suppliers);

    if (!Array.isArray(suppliers)) {
      return NextResponse.json(
        { error: "Invalid request body. Expected an array of suppliers." },
        { status: 400 }
      );
    }

    // Get the starting supplier ID as a string
    let startSupplierId = await supplierIdGenerator();

    // Convert startSupplierId to a number
    let supplierIdNumber = parseInt(startSupplierId, 10);

    for (const supplier of suppliers) {
      const {
        supplierName,
        supplierContactName,
        supplierAddress,
        supplierPhone,
        supplierTaxId,
      } = supplier;

      console.log(supplierName, supplierContactName, supplierAddress, supplierPhone, supplierTaxId);

      // Convert number back to string
      const supplierId = supplierIdNumber.toString();

      // Insert the supplier into the database
      const query = `INSERT INTO SUPPLIER (S_ID, S_NAME, S_CONTACT_NAME, S_ADDRESS, S_TEL, S_TAX_ID) VALUES (?, ?, ?, ?, ?, ?)`;
      const params = [supplierId, supplierName, supplierContactName, supplierAddress, supplierPhone, supplierTaxId];

      try {
        const result = await new Promise((resolve, reject) =>
          db.query(query, params, (err:any, results:any) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          })
        );

        // Increment supplierIdNumber for the next iteration
        supplierIdNumber++;

      } catch (error) {
        console.error("Error inserting supplier:", error);
        throw new Error("Failed to insert supplier into database");
      }
    }

    return NextResponse.json({ message: "Suppliers created successfully", status: 200 });

  } catch (error) {
    console.error("Error while processing request:", error);
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
};
