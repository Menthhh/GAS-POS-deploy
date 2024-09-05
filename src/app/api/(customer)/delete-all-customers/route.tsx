import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";

export const DELETE = async (req: NextRequest) => {
    try {
        const query = `DELETE FROM CUST`;

        await new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    console.error("Error deleting all customers:", err);
                    reject(err);
                }
                resolve(result);
            });
        });

        return NextResponse.json({ message: 'All customers deleted successfully', status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message, status: 500 });
    }
};

export default DELETE;
