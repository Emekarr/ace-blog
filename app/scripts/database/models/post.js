const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title: {
        type : String,
        required: true,
        trim: true,
        unique: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    views: {
        type: String,
        trim: true,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post
