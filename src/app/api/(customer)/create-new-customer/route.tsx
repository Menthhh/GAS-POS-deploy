import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";
import type { Customer } from "@/models/Customer.type";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { ccode, cname, csurn, tel, lineid, email1, type1, org_name, org_addr1, org_addr2, refno, taxid, send_addr1, send_addr2, day1 } = body;

        if (!ccode || !cname || !type1) {
            return NextResponse.json({ error: "Missing required fields", status: 400 });
        }

        const query = `
            INSERT INTO CUST (
                CCODE, CNAME, CSURN, TEL, LINEID, EMAIL1, TYPE1, ORG_NAME, ORG_ADDR1, ORG_ADDR2, REFNO, TAXID, SEND_ADDR1, SEND_ADDR2, DAY1
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            ccode || "-",
            cname || "-",
            csurn || "-",
            tel || "-",
            lineid || "-",
            email1 || "-",
            type1 || "-",
            org_name || "-",
            org_addr1 || "-",
            org_addr2 || "-",
            refno || "-",
            taxid || "-",
            send_addr1 || "-",
            send_addr2 || "-",
            day1 || null
        ];

        await new Promise((resolve, reject) => {
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error("Error inserting customer:", err);
                    reject(err);
                }
                resolve(result);
            });
        });

        return NextResponse.json({ message: 'Customer created successfully', status: 201 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message, status: 500 });
    }
};