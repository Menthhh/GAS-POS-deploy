import mysql from 'mysql2';



const db = mysql.createPool({
    host: 'gas-pos.cn0iiumo0kgr.ap-southeast-1.rds.amazonaws.com', 
    port: 3306,
    user: 'admin',
    password: 'goodappdeploy',
    database: 'GASPOS',
});


db.getConnection((err:any, connection:any) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID:', connection.threadId);
});

export default db;