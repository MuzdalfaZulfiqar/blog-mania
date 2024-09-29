const  mongoose  = require("mongoose");

const {Schema} = mongoose

const commentSchema = new Schema({
    commentor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    // to which blog it belongs
    blog : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Blog'
    },
    content : {
        type : String
    }
    ,
    commentMadeOn : {
        type : Date,
        default: Date.now()
    }
})


const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment