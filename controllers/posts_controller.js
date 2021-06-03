const Post = require('../models/post')
const User = require('../models/user')


exports.createPost = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            console.log("User is not found")
            return res.redirect('back')
        }
    
        const newPost = await Post.create({
            content: req.body.content,
            user: req.params.id
        })

        return res.redirect('back')
    } catch (error) {
        console.log("error in creating a new post", error)
        return res.redirect('back')
    }
}