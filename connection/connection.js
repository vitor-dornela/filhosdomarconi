
// conexão
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hackfaesa23',
    database: 'emissao_co2',
});

module.exports = connection;