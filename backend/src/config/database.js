import "dotenv/config";

const isProduction = process.env.NODE_ENV === 'production';

const dbConfig = {
  dialect: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ...(isProduction
    ? {
        dialectOptions: {
          socketPath: '/cloudsql/cdc-org:southamerica-east1:postgres-cdc',
          ssl: false,
          keepAlive: true,
          application_name: 'cdc-backend'
        }
      }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialectOptions: {
          ssl: false,
          keepAlive: true,
          application_name: 'cdc-backend'
        }
      }
  ),
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    evict: 10000
  },
  retry: {
    max: 3,
    timeout: 3000
  },
  define: { timestamps: true }
};

export default dbConfig;
