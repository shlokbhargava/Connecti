const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')


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


exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            console.log("Post Not found Try again")
            return res.redirect('back')
        }

        if (post.user != req.user.id) {
            console.log("Not authorized")
            return res.redirect('back')
        }

        post.remove()

        await Comment.deleteMany({ post: req.params.id })
        return res.redirect('back')
    } catch (error) {
        console.log("error in deleting a post", error)
        return res.redirect('back')
    }
}