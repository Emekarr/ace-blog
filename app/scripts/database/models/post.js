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
        type: Number,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    author: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

postSchema.methods.toJSON = function() {
    const postObject = this.toObject()
    delete postObject.tokens
    delete postObject.updatedAt
    delete postObject.owner
    delete postObject._v
    delete postObject._id
    
    return postObject
}

const Post = mongoose.model("Post", postSchema)

module.exports = Post
