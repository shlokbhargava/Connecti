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