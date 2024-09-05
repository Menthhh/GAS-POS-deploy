import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";
import type { Customer } from "@/models/Customer.type";

export const dynamic = 'force-dynamic';
export const GET = async (req: NextRequest) => {
    try {
        const url = new URL(req.url);
        const ccode = url.searchParams.get('ccode');

        if (!ccode) {
            return NextResponse.json({ error: "Missing customer code (ccode)", status: 400 });
        }

        const query = `
            SELECT 
                CCODE, 
                CNAME, 
                CSURN, 
                TEL, 
                LINEID, 
                EMAIL1, 
                TYPE1, 
                ORG_NAME, 
                ORG_ADDR1, 
                ORG_ADDR2, 
                REFNO, 
                TAXID, 
                SEND_ADDR1, 
                SEND_ADDR2, 
                DAY1
            FROM 
                CUST
            WHERE 
                CCODE = ?
        `;

        const customer = await new Promise<Customer | null>((resolve, reject) => {
            db.query(query, [ccode], (err, result) => {
                if (err) {
                    console.error("Error fetching customer:", err);
                    reject(err);
                }
                if (result.length === 0) {
                    resolve(null);
                } else {
                    resolve(result[0]);
                }
            });
        });

        if (customer) {
            return NextResponse.json({ customer, status: 200 });
        } else {
            return NextResponse.json({ error: "Customer not found", status: 404 });
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message, status: 500 });
    }
};
