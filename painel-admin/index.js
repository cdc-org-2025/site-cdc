import express from 'express'
import session from 'express-session'
import passport from './config/passport.js'
import { adminJs } from './config/admin.js'
import { sequelize } from './config/database.js'
import authRoutes from './routes/auth.js'
import uploadEditorImageRoute from './routes/uploadIMG.js';
import AdminJSExpress from '@adminjs/express'
import path from 'path';
import { fileURLToPath } from 'url'; // Necessário para ESM


// Obter __dirname em módulos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.static('public'))

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

const adminRouter = AdminJSExpress.buildRouter(adminJs)

app.use(adminJs.options.rootPath, (req, res, next) => {
    if (req.path.startsWith('/auth/google') || req.path.startsWith('/auth/google/callback')) {
        next()
    } else if (req.session.passport && req.session.passport.user) {
        next()
    } else {
        res.redirect(`${adminJs.options.rootPath}/auth/google`)
    }
})

app.use("/assets", express.static(path.join(__dirname, './assets')));
app.use(authRoutes)
app.use(uploadEditorImageRoute);
app.use(adminJs.options.rootPath, adminRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🛠️ Painel AdminJS rodando em http://localhost:${PORT}/admin`)
})
