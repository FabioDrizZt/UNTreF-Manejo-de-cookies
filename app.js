// Cargar archivo de variables de entorno
process.loadEnvFile();

// Cargar librerías
const express = require("express");
const cookieParser = require("cookie-parser");

// Configurar variables
const PORT = process.env.PORT || 3000;
const app = express();
const inicioServidor = new Date()            // Tiempo de inicio del servidor

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
  res.cookie("nodeCookie", new Date(), {
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    httpOnly: true, // Solo HTTP
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // Anti-CSRF
  });

  const fechaVisita = new Date().toISOString();

  // PREPARAR DATOS PARA LA VISTA EJS
  const datosVista = {
    titulo: "Aprendiendo Manejo de Cookies",
    mensajeBienvenida: "Bienvenido al Tutorial de Cookies",
    fechaCookie: new Date(fechaVisita).toLocaleString("es-ES"),
    estadisticas: {
      totalCookies: Object.keys(req.cookies).length + 1, // +1 por la nueva cookie
      tiempoEjecucion: inicioServidor.toLocaleString("es-ES"),
      puerto: PORT,
    },
    rutas: [
      {
        metodo: "GET",
        path: "/",
        descripcion: "Establecer cookie (esta página)",
      },
      {
        metodo: "GET",
        path: "/leer-cookie",
        descripcion: "Leer cookie existente",
      },
      {
        metodo: "GET",
        path: "/eliminar-cookie",
        descripcion: "Eliminar cookie",
      },
      {
        metodo: "GET",
        path: "/listar-cookies",
        descripcion: "Ver todas las cookies",
      },
      {
        metodo: "POST",
        path: "/establecer-cookie-personalizada",
        descripcion: "Cookie personalizada",
      },
    ],
    infoTecnica: {
      nodeVersion: process.version,
      entorno: process.env.NODE_ENV || "development",
    },
  };

  res.render("index", datosVista);
});
app.listen(PORT, () => {
  console.log("🚀 Servidor iniciado exitosamente");
  console.log(`🌐 Disponible en: http://localhost:${PORT}`);
  console.log(`📚 Rutas disponibles:`);
  console.log(`   GET  / - Establecer cookie (EJS: views/index.ejs)`);
  console.log(`   GET  /leer-cookie - Leer cookie (JSON)`);
  console.log(`   GET  /eliminar-cookie - Eliminar cookie (JSON)`);
  console.log(`   GET  /listar-cookies - Listar cookie (JSON)`); 
});
