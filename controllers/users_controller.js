const User = require('../models/user')

exports.createUser = async (req, res) => {
    try {
        if (req.body.password != req.body.confirm_password) {
            req.flash('danger', 'Passwords do not match')
            return res.redirect('back')
        }
    
        const user = await User.findOne({ email: req.body.email })
    
        if (user) {
            req.flash('info', 'User Already exists')
            return res.redirect('back')
        } else {
            const newUser = await User.create(req.body)
            req.flash('success', 'Account created, Sign In')
        }

        return res.redirect('/')
    } catch (error) {
        req.flash('danger', error)
        return res.redirect('/');
    }
}


exports.createSession = (req, res) => {
    req.flash('success', `Welcome ${req.user.name}`)
    return res.redirect('/')
}


exports.logout = (req, res) => {
    req.logout()
    req.flash('success', 'You have logged out!')
    return res.redirect('/')
}