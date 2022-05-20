const Pool = require('pg').Pool;

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    password:'password',
    database:'construction_api',
    port:5432
});
module.exports = pool;