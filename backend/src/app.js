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
    console.log("✅ Conexão com o banco de dados estabelecida com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar com o banco de dados:", error);
  }
})();

export default app;
