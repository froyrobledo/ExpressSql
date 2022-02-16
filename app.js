const express = require("express");
const mysql = require("mysql");

const PORT = process.env.PORT || 3000;
const app = express();
const cors = require('cors')

app.use(cors({
  origin:'http://localhost:4200'
}))
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crudNest",
});

app.get("/", (req, res) => {
  res.send("Bienvenido a mi api");
});

// Todos los produtos
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send("No hay resultados");
    }
  });
});

// Todos los produtos
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM products WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send("No hay resultados");
    }
  });
});

// Crear produtos
app.post("/add", (req, res) => {
  const sql = "INSERT INTO products SET ?";
  const productObj = {
    name: req.body.name,
    price: req.body.price,
  };
  connection.query(sql, productObj, (error) => {
    if (error) throw error;
    res.send("Producto Creado");
  });
});

// Update produtos
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const {name, price }= req.body
  const sql = `UPDATE products SET name = '${name}',  price = '${price}' WHERE id = '${id}' `
  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("Producto Actualizado");
  });
});

// Delete produtos
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM products  WHERE id = '${id}' `
  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("Producto Eliminado");
  });
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Conexion exitosa");
});

app.listen(PORT, () => console.log(`Servidor Corriendo en el Puerto ${PORT}`));
