import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import routes from "./routes/index.js";
import db from "./models/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos de upload local
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Rota de Diagnóstico & Healthcheck
app.get("/", (req, res) => {
  res.json({
    status: "online",
    service: "CDC Backend Express API",
    environment: process.env.NODE_ENV || "development",
    endpoints: {
      health: "/api/health",
      api: "/api"
    }
  });
});

app.use("/api", routes);

// Testa a conexão com o banco
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Conexão com o banco estabelecida com sucesso!");
    
    // Teste adicional - execute uma query simples
    const [results] = await db.sequelize.query("SELECT current_user");
    console.log("👤 Usuário conectado:", results[0].current_user);
  } catch (error) {
    console.error("❌ Falha na conexão:", {
      message: error.message,
      original: error.original,
      config: db.sequelize.config // Mostra a configuração usada
    });
    process.exit(1);
  }
})();

export default app;
