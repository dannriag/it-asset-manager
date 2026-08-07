require("dotenv").config();
const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

async function connectDB() {
  try {
    // sql.connect() gestiona un "Connection Pool" interno automáticamente
    const pool = await sql.connect(config);
    console.log("Connected to Azure SQL Database");
    return pool;
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err; // Es mejor relanzar el error para que el archivo que lo llama sepa que falló
  }
}

// Exportamos tanto la librería como la función de conexión
module.exports = { sql, connectDB };