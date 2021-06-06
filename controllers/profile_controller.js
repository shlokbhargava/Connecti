const User = require('../models/user')

exports.getUserProfile = (req, res) => {
    return res.render('profile', {
        title: `Profile | ${req.user.name}`
    })
}


exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if (user) {
            const existsEmail = await User.findOne({ email: req.body.email })

            if (existsEmail && existsEmail._id.toString().localeCompare(req.user._id.toString()) != 0) {
                console.log('Email already in use')
            } else {
                if (req.body.password != req.body.confirmPassword) {
                    console.log('Passwords do not match')
                } else {
                    user.name = req.body.name,
                    user.email = req.body.email,
                    user.password = req.body.password

                    user.save()
                }
            }
        } else {
            console.log('User not found')
        }
        
        return res.redirect('back')

    } catch (error) {
        console.log("Error in update profile", error)
        return res.redirect('back')
    }
}