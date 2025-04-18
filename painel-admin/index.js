import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
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
    dialectOptions: process.env.DB_HOST.includes('/cloudsql') ? { socketPath: process.env.DB_HOST } : {},
    logging: false,
})

// Model Categoria
const Categoria = sequelize.define('Categoria', {
    nome: DataTypes.STRING,
}, {
    tableName: "categorias",
    timestamps: false,
})

// Configurar Passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/admin/auth/google/callback`, // EXATAMENTE assim no local
},
(accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

const app = express();

// Sessão Express
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

const adminJs = new AdminJS({
    resources: [Categoria],
    rootPath: '/admin',
});

// Proteção: se não logado, redireciona para login Google
const router = AdminJSExpress.buildRouter(adminJs);

// Proteção das rotas
app.use(adminJs.options.rootPath, (req, res, next) => {
    if (
        req.path.startsWith('/auth/google') ||
        req.path.startsWith('/auth/google/callback')
    ) {
        next(); // Libera rotas de login/callback
    } else if (req.session.passport && req.session.passport.user) {
        next(); // Usuário logado
    } else {
        res.redirect(`${adminJs.options.rootPath}/auth/google`);
    }
});

// Rotas do Google OAuth
app.get('/admin/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/admin/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/admin' }),
    (req, res) => {
        res.redirect('/admin');
    }
);

// Monta o AdminJS dentro do /admin corretamente
app.use(adminJs.options.rootPath, router);

// Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🛠️ Painel AdminJS rodando em http://localhost:${PORT}/admin`);
});
