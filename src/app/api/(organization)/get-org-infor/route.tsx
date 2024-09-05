import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';



interface Org {
    ORGCODE: string;
    ORGNAME: string;
    ADDR1: string;
    ADDR2: string;
    TEL: string;
    LINEID: string;
    EMAIL1: string;
    TAXID: string;
}

export const dynamic = 'force-dynamic';
export const GET = async (req: NextRequest) => {
    try {
        const sqlQuery = 'SELECT * FROM ORG1';
        const [orgInfor]: [Org[]] = await db.promise().query(sqlQuery);
        return NextResponse.json({ orgInfor, status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'An error occurred while fetching the data', status: 500 });
    }
};
