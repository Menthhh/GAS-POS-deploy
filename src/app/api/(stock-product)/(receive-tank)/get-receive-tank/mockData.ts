// mockData.ts

export interface ReceiveTankType {
    MYEAR: string;
    MONTH: number;
    REENO: string;
    RDATE: string;
    TDATE: string;
    S_ID: string;
    S_NAME: string;
    TOTAL: number;
}

export interface ReceiveTank {
    MYEAR: string;
    MONTH: number;
    REENO: string;
    RDATE: string;
    TDATE: string;
    S_ID: string;
    TOTAL: number;
}

export interface ReceiveTankDt {
    REENO: string;
    P_CODE: string;
    QTY: number;
    U_PRICE: number;
    AMT: number;
}

export const receiveTankData: ReceiveTank[] = [
    {
        MYEAR: '2023',
        MONTH: 1,
        REENO: 'RT001',
        RDATE: '2023-01-01',
        TDATE: '2023-01-01',
        S_ID: 'S001',
        TOTAL: 1500.50
    },
    {
        MYEAR: '2023',
        MONTH: 2,
        REENO: 'RT002',
        RDATE: '2023-02-01',
        TDATE: '2023-02-01',
        S_ID: 'S002',
        TOTAL: 2000.75
    },
    {
        MYEAR: '2023',
        MONTH: 3,
        REENO: 'RT003',
        RDATE: '2023-03-01',
        TDATE: '2023-03-01',
        S_ID: 'S003',
        TOTAL: 1750.25
    }
];

export const receiveTankDtData: ReceiveTankDt[] = [
    {
        REENO: 'RT001',
        P_CODE: 'P001',
        QTY: 10,
        U_PRICE: 50.05,
        AMT: 500.50
    },
    {
        REENO: 'RT001',
        P_CODE: 'P002',
        QTY: 20,
        U_PRICE: 50.00,
        AMT: 1000.00
    },
    {
        REENO: 'RT002',
        P_CODE: 'P001',
        QTY: 15,
        U_PRICE: 50.05,
        AMT: 750.75
    },
    {
        REENO: 'RT002',
        P_CODE: 'P003',
        QTY: 25,
        U_PRICE: 50.00,
        AMT: 1250.00
    },
    {
        REENO: 'RT003',
        P_CODE: 'P002',
        QTY: 20,
        U_PRICE: 50.00,
        AMT: 1000.00
    },
    {
        REENO: 'RT003',
        P_CODE: 'P003',
        QTY: 15,
        U_PRICE: 50.35,
        AMT: 750.25
    }
];
