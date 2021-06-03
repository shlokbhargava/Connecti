const User = require('../models/user')

exports.getUserProfile = (req, res) => {
    return res.render('profile', {
        title: `Profile | ${req.user.name}`
    })
}

exports.createUser = async (req, res) => {
    try {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back')
        }
    
        const user = await User.findOne({ email: req.body.email })
    
        if (user) {
            return res.redirect('back')
        } else {
            const newUser = await User.create(req.body)
        }

        return res.redirect('/')
    } catch (error) {
        console.log('Error in creating user', error)
        return;
    }
}


exports.createSession = (req, res) => {
    return res.redirect('/')
}


exports.logout = (req, res) => {
    req.logout()
    return res.redirect('/')
}