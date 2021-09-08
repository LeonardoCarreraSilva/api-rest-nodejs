const mysql = require('mysql');

const conexao = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'Leonardo',
  password: '123456789',
  database: 'Agenda-petshop'

})

module.exports = conexao;