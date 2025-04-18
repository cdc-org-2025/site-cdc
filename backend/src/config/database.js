import "dotenv/config";

const dbConfig = {
  dialect: 'postgres',
  username: 'appuser',
  password: 'NovaSenhaForte2025',
  database: 'postgres',
  define: { timestamps: true },
  dialectOptions: {
    socketPath: '/cloudsql/cdc-org:southamerica-east1:postgres-cdc',
    ssl: false,
    keepAlive: true,
    application_name: 'cdc-backend'
  },
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
  }
};

export default dbConfig;
