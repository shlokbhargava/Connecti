const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users_controller')

router.get('/profile', usersController.getUserProfile)
router.post('/create', usersController.createUser)


module.exports = router