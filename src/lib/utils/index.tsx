import db from '@/lib/config/db';


export const productIdGenerator = async () => {
    try {
        // Fetch the maximum P_ID from the database
        const maxIdResult = await new Promise((resolve, reject) => {
            db.query('SELECT MAX(P_ID) as maxId FROM PRODUCT', (err: string, results: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0].maxId);
                }
            });
        });

        // Increment the maximum P_ID and pad it with leading zeros
        const nextId = (parseInt(maxIdResult || '10000', 10) + 1).toString();

        return nextId;
    } catch (error) {
        throw new Error('Error generating custom ID: ' + error.message);
    }
}

export const accountIdGenerator = async () => {
    // I want running number for account id to be 10001, 10002, 10003, etc
    try {
        // Fetch the maximum pt_id from the database
        const maxIdResult = await new Promise((resolve, reject) => {
            db.query('SELECT MAX(ACCOUNT_ID) as maxId FROM BANK_ACCOUNT', (err:string, results:string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0].maxId);
                }
            });
        });

        // Increment the maximum pt_id and pad it with leading zeros
        const nextId = (parseInt(maxIdResult || '10000', 10) + 1).toString().padStart(5, '0');

        // Add additional zeros to create a 6-digit ID
        const formattedId = nextId.padStart(6, '0');

        return formattedId;
    } catch (error) {
        throw new Error('Error generating custom ID: ' + error.message);
    }
}

export const  productTypeIdGenerator = async () => {
    try {
        // Fetch the maximum pt_id from the database
        const maxIdResult = await new Promise((resolve, reject) => {
            db.query('SELECT MAX(PT_ID) as maxId FROM PRODUCT_TYPE', (err:string, results:string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0].maxId);
                }
            });
        });

        // Increment the maximum pt_id and pad it with leading zeros
        const nextId = (parseInt(maxIdResult || '00', 10) + 1).toString().padStart(2, '0');

        // Add additional zeros to create a 6-digit ID
        const formattedId = nextId.padStart(2, '0');

        return formattedId;
    } catch (error) {
        throw new Error('Error generating custom ID: ' + error.message);
    }
}

export const unitIdGenerator = async () => {
    try {
        // Fetch the maximum U_ID from the database
        const maxIdResult = await new Promise((resolve, reject) => {
            db.query('SELECT MAX(U_ID) as maxId FROM UNIT', (err:string, results:string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0].maxId);
                }
            });
        });

        // Increment the maximum U_ID and pad it with leading zeros to make it three digits
        const nextId = (parseInt(maxIdResult || '0', 10) + 1).toString().padStart(3, '0');

        return nextId;
    } catch (error) {
        throw new Error('Error generating custom ID: ' + error.message);
    }
}


export const userIdGenerator = async () => {
    //01 02 03 04
    try {
        // Fetch the maximum pt_id from the database
        const maxIdResult = await new Promise((resolve, reject) => {
            db.query('SELECT MAX(USER_ID) as maxId FROM USER', (err:string, results:string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0].maxId);
                }
            });
        });

        // Increment the maximum pt_id and pad it with leading zeros
        const nextId = (parseInt(maxIdResult || '00', 10) + 1).toString().padStart(2, '0');

        // Add additional zeros to create a 6-digit ID
        const formattedId = nextId.padStart(2, '0');

        return formattedId;
    } catch (error) {
        throw new Error('Error generating custom ID: ' + error.message);
    }
}

export const supplierIdGenerator = async () => {
    try {
        // Get the current Buddhist year (2567 corresponds to 2024 in Gregorian calendar)
        const buddhistYear = new Date().getFullYear() + 543; // 2567 in Buddhist calendar

        // Fetch the maximum supplier_id from the database for the current Buddhist year
        const maxIdResult = await new Promise((resolve, reject) => {
            db.query(
                'SELECT MAX(S_ID) as maxId FROM SUPPLIER WHERE SUBSTRING(S_ID, 1, 2) = ?',
                [buddhistYear.toString().slice(-2)],
                (err:any, results:any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results[0].maxId);
                    }
                }
            );
        });

        // Determine the next sequential number (starting from '0001')
        let nextNumber = 1;
        if (maxIdResult) {
            const lastId = maxIdResult.substr(-4); // Get the last 4 characters (assuming format is 'YYXXXX')
            nextNumber = parseInt(lastId, 10) + 1;
        }

        // Pad the number with leading zeros (4 digits)
        const paddedNumber = nextNumber.toString().padStart(4, '0');

        // Formulate the supplier ID
        const formattedId = `${buddhistYear.toString().slice(-2)}${paddedNumber}`;

        return formattedId;
    } catch (error) {
        throw new Error('Error generating supplier ID: ' + error.message);
    }
}

export const customerIdGenerator = async () => {
    try {
        // Get the current Buddhist year
        const buddhistYear = new Date().getFullYear() + 543;
        const yearPrefix = buddhistYear.toString().slice(-2);

        // Fetch the maximum CCODE from the database for the current Buddhist year
        const maxIdResult = await new Promise((resolve, reject) => {
            db.query(
                'SELECT MAX(CCODE) as maxId FROM CUST WHERE SUBSTRING(CCODE, 1, 2) = ?',
                [yearPrefix],
                (err: any, results: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results[0].maxId);
                    }
                }
            );
        });

        // Determine the next sequential number (starting from '00001')
        let nextNumber = 1;
        if (maxIdResult) {
            const lastId = maxIdResult.substr(-5); // Get the last 5 characters
            nextNumber = parseInt(lastId, 10) + 1;
        }

        // Pad the number with leading zeros (5 digits)
        const paddedNumber = nextNumber.toString().padStart(5, '0');

        // Formulate the customer ID
        const customerId = `${yearPrefix}${paddedNumber}`;

        return customerId;
    } catch (error) {
        throw new Error('Error generating customer ID: ' + error.message);
    }
}