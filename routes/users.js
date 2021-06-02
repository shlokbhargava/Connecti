const express = require('express')
const passport = require('passport')
const router = express.Router()
const usersController = require('../controllers/users_controller')

router.get('/profile', usersController.getUserProfile)
router.post('/create', usersController.createUser)
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: 'back'},
), usersController.createSession)


module.exports = router