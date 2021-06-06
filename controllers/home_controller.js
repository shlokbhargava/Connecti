const Post = require('../models/post')
const User = require('../models/user')

exports.home = async (req, res) => {

    try {
        
        const posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })

        const users = await User.find({})
        
        return res.render('home', {
            title: 'Home',
            posts: posts,
            users: users
        })        
    } catch (error) {
        req.flash('danger', error)
        return;
    }
}