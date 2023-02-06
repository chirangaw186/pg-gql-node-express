require('dotenv').config()
const pgPromise = require('pg-promise');

const pgp = pgPromise({}); // Empty object means no additional config required

const config = {
    host: "database-instance-1.c9tovrge2tiq.us-east-1.rds.amazonaws.com",
    user: "postgres",
    password: "Postgres#19",
    database: "Students",
    port: "5432"
};

const db = pgp(config);

exports.db = db;