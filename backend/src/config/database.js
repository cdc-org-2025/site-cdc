import "dotenv/config";

const isProduction = process.env.NODE_ENV === 'production';

const dbConfig = {
  dialect: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ...(isProduction
    ? {
        host: process.env.DB_HOST,  // Usando a variável de ambiente
        dialectOptions: {
          ssl: false,
          keepAlive: true,
          application_name: 'cdc-backend'
        }
      }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialectOptions: {
          ssl: false,
          keepAlive: true,
          application_name: 'cdc-backend'
        }
      }
  ),
  // ... restante da configuração permanece igual
};

export default dbConfig;
