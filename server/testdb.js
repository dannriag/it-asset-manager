const sql = require('mssql');

console.log("🚀 [DEBUG] Iniciando script de prueba...");
// 1. Configuración de las credenciales
const config = {
    user: "sqladmin",
    password: "sEcp4ssw0rd!",
    server: "itassetmanager-sql-itmd504.database.windows.net",
    database: "itassetmanagerdb",
    options: {
        encrypt: true,
        trustServerCertificate: false
    },
    connectionTimeout: 5000
};

process.on('uncaughtException', (err) => {
    console.error("💥 Error global detectado:", err.message);
    process.exit(1);
});

// Ejecución directa
(async () => {
    try {
        console.log("📡 Intentando conectar al servidor de Azure...");
        const pool = await sql.connect(config);
        
        console.log("✅ ¡Conectado con éxito! Enviando consulta...");
        const result = await pool.request().query("SELECT 1 AS Conectado;");
        
        console.log("📊 Datos de Azure recibidos:", result.recordset);
        
        await sql.close();
        console.log("🔒 Conexión cerrada limpiamente.");
    } catch (error) {
        console.log("❌ Error capturado en el proceso:");
        console.error(error);
    }
})();