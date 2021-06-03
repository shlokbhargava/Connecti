const express = require('express')
const router = express.Router()
const passport = require('passport')

const postsController = require('../controllers/posts_controller')

router.post('/create/:id', passport.checkAuthentication, postsController.createPost)
router.get('/delete/:id', passport.checkAuthentication, postsController.deletePost)


module.exports = router


