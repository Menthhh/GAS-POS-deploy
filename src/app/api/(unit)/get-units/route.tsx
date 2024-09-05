// src/app/api/(unit)/get-units/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";

/**
 * @swagger
 * tags:
 *   - name: Unit
 *     description: API endpoints related to unit management
 * 
 * /api/unit/get-units:
 *   get:
 *     summary: Get all units
 *     tags: [Unit]
 *     description: This endpoint retrieves all units from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the units.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 units:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       U_ID:
 *                         type: string
 *                         description: The ID of the unit.
 *                       U_NAME:
 *                         type: string
 *                         description: The name of the unit.
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

        return NextResponse.json({ status: 200, units });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500 });
    }
}


