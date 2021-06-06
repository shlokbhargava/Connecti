const User = require('../models/user')

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (user) {
            return res.render('profile', {
                title: `Profile | ${user.name}`,
                userProfile: user
            })
        }
    } catch (error) {
        console.log('User Profile not found')
    }

    return res.redirect('back')
}


exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if (user) {
            const existsEmail = await User.findOne({ email: req.body.email })

            if (existsEmail && existsEmail._id.toString().localeCompare(req.user._id.toString()) != 0) {
                req.flash('info', 'Email already in use')
            } else {
                if (req.body.password != req.body.confirmPassword) {
                    req.flash('danger', 'Passwords do not match')
                } else {
                    user.name = req.body.name,
                    user.email = req.body.email,
                    user.password = req.body.password

                    user.save()
                    req.flash('success', 'Profile updated successfully')
                }
            }
        } else {
            req.flash('danger', 'User not found')
        }
        
        return res.redirect('back')

    } catch (error) {
        console.log("Error in update profile", error)
        return res.redirect('back')
    }
}