// pages/api/delete-customers.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";

export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { customerIds } = body;

        if (!Array.isArray(customerIds) || customerIds.length === 0) {
            return NextResponse.json({ error: "Missing or empty array of customer IDs", status: 400 });
        }

        const query = `DELETE FROM CUST WHERE CCODE IN (?)`;
        
        await new Promise((resolve, reject) => {
            db.query(query, [customerIds], (err, result) => {
                if (err) {
                    console.error("Error deleting customers:", err);
                    reject(err);
                }
                resolve(result);
            });
        });

        return NextResponse.json({ message: 'Customers deleted successfully', status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message, status: 500 });
    }
};

export default DELETE;
