const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');

const ca = fs.readFileSync(path.join(__dirname, '../certs/ca.pem'));

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: "mysql",
        dialectOptions: {
            ssl: {
                ca: ca,
                rejectUnauthorized: true
            }
        },
        logging: console.log, 
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('✅ Succesfull connection to Aiven MySQL');
    })
    .catch(err => {
        console.error('❌ Error to connect to database:', err);
    });

module.exports = sequelize;