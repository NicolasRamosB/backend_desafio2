const e = require("express");
let express = require("express");
let app = express();
const fs = require("fs");
require("dotenv").config();
const Contenedor = require("./desafio2.js");
const productos = new Contenedor("productos.txt");

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "This is a list of server endpoints",
    endpoints: [
      {
        method: "GET",
        url: "/productos",
      },
      {
        method: "GET",
        url: "/productoRandom",
      },
    ],
  });
});

app.get("/productos", async (_req, res) => {
  try {
    const readProducts = await fs.promises.readFile("./productos.txt", "utf-8");
    res.status(202).send(readProducts.toString());
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
});

app.get("/productoRandom", async (_req, res) => {
  try {
    const result = await productos.getAll();
    const randomIndex = Math.floor(Math.random() * (result.length - 0 + 1) + 0);
    res.send(result[randomIndex]);
  } catch (error) {
    res.status(404).send({ data: null, error: `Archivo inexistente` });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor de prueba ${PORT}`);
});
