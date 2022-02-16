const mysql = require('mysql')

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'products'
})
connection.connect(error => {
    if(error)throw error
    console.log('Conexion exitosa');
})

module.exports = connection