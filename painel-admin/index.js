import express from "express";
import { Database, Resource } from '@adminjs/sequelize'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Sequelize, DataTypes } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

AdminJS.registerAdapter({ Database, Resource })

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: process.env.DB_HOST,
    logging: false,
})


const Categoria = sequelize.define('Categoria', {
    nome: DataTypes.STRING,
}, {
    tableName: "categorias",
    timestamps: false,
})

const adminJs = new AdminJS({
    resources: [Categoria],
    rootPath: '/admin',
})

const app = express()
const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            return { email }
        }
        return null
    },
    cookiePassword: process.env.COOKIE_SECRET,
})


app.use(adminJs.options.rootPath, router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`🛠️ Painel AdminJS rodando em http://localhost:${PORT}/admin`)
})