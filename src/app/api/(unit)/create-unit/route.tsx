// src/app/api/(unit)/create-unit/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";
import { unitIdGenerator } from "@/lib/utils";

/**
 * @swagger
 * tags:
 *   - name: Unit
 *     description: API endpoints related to unit management
 * 
 * /api/unit/create-unit:
 *   post:
 *     summary: Create a new unit
 *     tags: [Unit]
 *     description: This endpoint allows you to create a new unit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               unit:
 *                 type: string
 *                 description: The name of the unit.
 *                 example: "Kilogram"
 *     responses:
 *       200:
 *         description: Successfully created the unit.
 *       500:
 *         description: Internal server error.
 */

export const POST = async (req:NextRequest, res:NextResponse) => {
    try {
        const body = await req.json();
        const { unit } = body;
        const unitId = await unitIdGenerator();
        const result = await new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO UNIT (U_ID, U_NAME) VALUES ('${unitId}', '${unit}')`,
                (err:any, result:any) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(result);
                }
            );
        });

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500 });
    }
}


