const express = require('express')
const passport = require('passport')
const router = express.Router()
const profileController = require('../controllers/profile_controller')

router.get('/', passport.checkAuthentication, profileController.getUserProfile)
router.post('/update', passport.checkAuthentication, profileController.updateUserProfile)

module.exports = router