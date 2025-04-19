import express from 'express'
import passport from '../config/passport.js'

const router = express.Router()

router.get('/admin/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get('/admin/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/admin' }),
  (req, res) => {
    res.redirect('/admin')
  }
)

export default router
