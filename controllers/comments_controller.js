const Comment = require('../models/comment')
const Post = require('../models/post')


exports.createComment = async (req, res) => {
    try {
        const post = await Post.findById(req.body.post)

        if (!post) {
            console.log("Post does not exists")
            return;
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
        console.log("error in creating a post")
        return;
    }
}


exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)

        if (!comment) {
            console.log("No comment found")
            return res.redirect('back')
        }

        if (comment && comment.user == req.user.id || comment.post.user == req.user.id) {
            const postId = comment.post
            
            comment.remove()

            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
        } else {
            console.log("Not authorized")
        }

        return res.redirect('back')
    } catch (error) {
        console.log("error in deleting comment", error)
        return res.redirect('back')
    }
}