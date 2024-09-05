import { customerIdGenerator } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from 'next';

export const dynamic = 'force-dynamic';
export const GET = async (req: NextRequest, res: NextApiResponse) => {
  try {
    const customerId = await customerIdGenerator();
    return NextResponse.json({ customerId, status: 200 });
  } catch (error) {
    return NextResponse.json({
      error: "Error generating customer ID",
      status: 500,
    });
  }
}
