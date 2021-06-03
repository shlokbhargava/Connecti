const express = require('express')
const passport = require('passport')
const router = express.Router()
const usersController = require('../controllers/users_controller')

router.get('/profile', passport.checkAuthentication, usersController.getUserProfile)
router.post('/create', usersController.createUser)
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: 'back'},
), usersController.createSession)
router.get('/logout', passport.checkAuthentication, usersController.logout)


module.exports = router