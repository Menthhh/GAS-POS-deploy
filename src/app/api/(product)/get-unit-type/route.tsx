// CREATE TABLE PRODUCT_TYPE (
// 	PT_ID VARCHAR(255) PRIMARY KEY NOT NULL,
// 	PT_NAME VARCHAR(255)
// )

// )

// CREATE TABLE UNIT (
// 	U_ID VARCHAR(255) PRIMARY KEY NOT NULL,
// 	U_NAME VARCHAR(255)
// )
// src/app/api/(product)/get-unit-type/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: API endpoints related to product operations
 * 
 * /api/product/get-unit-type:
 *   get:
 *     summary: Get unit types
 *     tags: [Product]
 *     description: This endpoint retrieves all unit types and product types.
 *     responses:
 *       200:
 *         description: Successfully retrieved the unit types and product types.
 *       500:
 *         description: Internal server error.
 */

export const dynamic = 'force-dynamic';
export const GET = async (req:NextRequest, res:NextResponse) => {
    try {
        const units = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM UNIT', (err:any, results:any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(results);
            } )
        });

        const productTypes = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM PRODUCT_TYPE', (err:any, results:any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(results);
            } )
        })

        return NextResponse.json({ status: 200, units, productTypes });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500 });
    }
}