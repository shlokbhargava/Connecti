const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')


exports.createPost = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if (!user) {
            req.flash('danger', 'User not found')
            return res.redirect('back')
        }
    
        const newPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        })

        req.flash('success', 'Congratulations! You have published a new post')
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
            req.flash('danger', 'Post Not found Try again')
            return res.redirect('back')
        }

        if (post.user != req.user.id) {
            req.flash('warning', 'Not authorized')
            return res.redirect('back')
        }

        post.remove()

        await Comment.deleteMany({ post: req.params.id })

        req.flash('success', 'Post deleted successfully')
        return res.redirect('back')
    } catch (error) {
        console.log("error in deleting a post", error)
        return res.redirect('back')
    }
}