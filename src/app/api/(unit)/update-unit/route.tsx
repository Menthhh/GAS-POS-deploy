// src/app/api/(unit)/update-unit/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";

/**
 * @swagger
 * tags:
 *   - name: Unit
 *     description: API endpoints related to unit management
 * 
 * /api/unit/update-unit:
 *   put:
 *     summary: Update a unit
 *     tags: [Unit]
 *     description: This endpoint allows you to update an existing unit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               unitId:
 *                 type: string
 *                 description: The ID of the unit.
 *                 example: "U123"
 *               unitName:
 *                 type: string
 *                 description: The new name of the unit.
 *                 example: "Kilogram"
 *     responses:
 *       200:
 *         description: Successfully updated the unit.
 *       500:
 *         description: Internal server error.
 */

export const PUT = async (req:NextRequest, res:NextResponse) => {
    try {
        const body = await req.json();
        const {
            unitId,
            unitName
        } = body;
        const result = await new Promise((resolve, reject) => {
            db.query(
                `UPDATE UNIT SET U_NAME = '${unitName}' WHERE U_ID = '${unitId}'`,
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


