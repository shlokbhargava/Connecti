const Comment = require('../models/comment')
const Post = require('../models/post')


exports.createComment = async (req, res) => {
    try {
        const post = await Post.findById(req.body.post)

        if (!post) {
            req.flash('danger', 'Post does not exists')
            return res.redirect('back');
        }

        const comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        })

        post.comments.push(comment)
        post.save()

        res.redirect('/')

    } catch (error) {
        req.flash('danger', error)
        return;
    }
}


exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)

        if (!comment) {
            req.flash('danger', 'No comment found')
        }

        if (comment && comment.user == req.user.id || comment.post.user == req.user.id) {
            const postId = comment.post
            
            comment.remove()

            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
            req.flash('success', 'Comment deleted successfully')
        } else {
            req.flash('warning', 'Not Authorized')
        }

        return res.redirect('back')
    } catch (error) {
        req.flash('danger', error)
        return res.redirect('back')
    }
}