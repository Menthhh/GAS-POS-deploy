// mockData.ts

export interface ImproveType {
    MYEAR: string;
    MONTH: number;
    REENO: string;
    RDATE: string;
    TDATE: string;
    TOTAL: number;
    P_CODE: string;
    QTY: number;
    U_PRICE: number;
    AMT: number;
}

export interface Improve {
    MYEAR: string;
    MONTH: number;
    REENO: string;
    RDATE: string;
    TDATE: string;
    TOTAL: number;
}

export interface ImproveDt {
    REENO: string;
    P_CODE: string;
    QTY: number;
    U_PRICE: number;
    AMT: number;
}

export const ImproveData: Improve[] = [
    {
        MYEAR: '2023',
        MONTH: 1,
        REENO: 'CS001',
        RDATE: '2023-01-01',
        TDATE: '2023-01-01',
        TOTAL: 1500.50
    },
    {
        MYEAR: '2023',
        MONTH: 2,
        REENO: 'CS002',
        RDATE: '2023-02-01',
        TDATE: '2023-02-01',
        TOTAL: 2000.75
    },
    {
        MYEAR: '2023',
        MONTH: 3,
        REENO: 'CS003',
        RDATE: '2023-03-01',
        TDATE: '2023-03-01',
        TOTAL: 1750.25
    }
];

export const ImproveDtData: ImproveDt[] = [
    {
        REENO: 'CS001',
        P_CODE: 'P001',
        QTY: 10,
        U_PRICE: 50.05,
        AMT: 500.50
    },
    {
        REENO: 'CS001',
        P_CODE: 'P002',
        QTY: 20,
        U_PRICE: 50.00,
        AMT: 1000.00
    },
    {
        REENO: 'CS002',
        P_CODE: 'P001',
        QTY: 15,
        U_PRICE: 50.05,
        AMT: 750.75
    },
    {
        REENO: 'CS002',
        P_CODE: 'P003',
        QTY: 25,
        U_PRICE: 50.00,
        AMT: 1250.00
    },
    {
        REENO: 'CS003',
        P_CODE: 'P002',
        QTY: 20,
        U_PRICE: 50.00,
        AMT: 1000.00
    },
    {
        REENO: 'CS003',
        P_CODE: 'P003',
        QTY: 15,
        U_PRICE: 50.35,
        AMT: 750.25
    }
];
