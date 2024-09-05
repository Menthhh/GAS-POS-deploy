import { NextApiResponse } from "next";
import db from "@/lib/config/db";
import { NextRequest, NextResponse } from "next/server";
import type { Customer } from "@/models/Customer.type";

export const dynamic = "force-dynamic";
export const GET = async (req: NextRequest, res: NextApiResponse) => {
  try {
    const customers: Customer[] = await new Promise((resolve, reject) => {
      db.query(
        `
            SELECT 
                CCODE, 
                CNAME, 
                CONCAT(IFNULL(ORG_ADDR1, ''), ' ', IFNULL(ORG_ADDR2, '')) AS ORG_ADDR, 
                CNAME AS CONTACT, 
                TEL, 
                TYPE1 
            FROM 
                CUST
            ORDER BY 
                CCODE;
            `,
        (err: any, result: any) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(result);
        }
      );
    });

    return NextResponse.json({ customers, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
};
