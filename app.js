// Cargar archivo de variables de entorno
process.loadEnvFile();

// Cargar librerías
const express = require("express");
const cookieParser = require("cookie-parser");

// Configurar variables
const PORT = process.env.PORT || 3000;
const app = express();
const inicioServidor = new Date();

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

// Configurar middlewares

// parsear el header 'cookie' de la petición
app.use(cookieParser());
// para parsear el body de la petición JSON
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
  res.send("Bienvenid@s");
});

app.listen(PORT, () => {
  console.log("🚀 Servidor iniciado exitosamente");
  console.log(`🌐 Disponible en: http://localhost:${PORT}`);
  console.log(`📚 Rutas disponibles:`);
  console.log(`   GET  / - Establecer cookie (EJS: views/index.ejs)`);
  console.log(`   GET  /leer-cookie - Leer cookie (JSON)`);
  console.log(`   GET  /eliminar-cookie - Eliminar cookie (JSON)`);
});
