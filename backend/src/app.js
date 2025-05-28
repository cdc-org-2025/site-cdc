import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import db from "./models/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
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
