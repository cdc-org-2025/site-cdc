import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import dbConfig from "../config/database.js";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};
const sequelize = new Sequelize({
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  logging: dbConfig.logging,
  pool: dbConfig.pool,
  retry: dbConfig.retry,
  define: dbConfig.define,
  host: dbConfig.host, // só se existir
  port: dbConfig.port, // só se existir
});

// Carrega todos os arquivos de model exceto o index.js
const modelFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file.endsWith(".js") && file !== "index.js");

for (const file of modelFiles) {
  const modelPath = pathToFileURL(path.join(__dirname, file));
  const { default: modelDef } = await import(modelPath);
  const model = modelDef.init(sequelize);
  db[model.name] = model;
}

// Executar associações se existirem
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
