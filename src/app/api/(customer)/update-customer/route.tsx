import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/config/db";
import type { Customer } from "@/models/Customer.type";

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const {
      ccode,
      cname,
      csurn,
      tel,
      lineid,
      email1,
      type1,
      org_name,
      org_addr1,
      org_addr2,
      refno,
      taxid,
      send_addr1,
      send_addr2,
      day1,
    } = body;

    if (!ccode) {
      return NextResponse.json({
        error: "Missing customer code (ccode)",
        status: 400,
      });
    }

    const query = `
            UPDATE CUST SET 
                CNAME = ?, 
                CSURN = ?, 
                TEL = ?, 
                LINEID = ?, 
                EMAIL1 = ?, 
                TYPE1 = ?, 
                ORG_NAME = ?, 
                ORG_ADDR1 = ?, 
                ORG_ADDR2 = ?, 
                REFNO = ?, 
                TAXID = ?, 
                SEND_ADDR1 = ?, 
                SEND_ADDR2 = ?, 
                DAY1 = ?
            WHERE CCODE = ?
        `;

    const values = [
      cname,
      csurn,
      tel,
      lineid,
      email1,
      type1,
      org_name,
      org_addr1,
      org_addr2,
      refno,
      taxid,
      send_addr1,
      send_addr2,
      day1,
      ccode,
    ];

    await new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Error updating customer:", err);
          reject(err);
        }
        resolve(result);
      });
    });

    return NextResponse.json({
      message: "Customer updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
};

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  try {
    const { ccode, ...updateFields } = await req.json();
    // const body = await req.json();
    if (!ccode) {
      return NextResponse.json({
        error: "Missing customer code (ccode)",
        status: 400,
      });
    }

    // Dynamically create the UPDATE query based on the fields provided
    const updateEntries = Object.entries(updateFields).filter(
      ([_, value]) => value !== undefined
    );
    if (updateEntries.length === 0) {
      return NextResponse.json({ error: "No fields to update", status: 400 });
    }

    const setClause = updateEntries
      .map(([key, _]) => `${key.toUpperCase()} = ?`)
      .join(", ");
    const query = `UPDATE CUST SET ${setClause} WHERE CCODE = ?`;

    const values = [...updateEntries.map(([_, value]) => value || "-"), ccode];

    await new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    return NextResponse.json({
      message: "Customer updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal server error", status: 500 });
  }
};
