const  mongoose  = require("mongoose");

const {Schema} = mongoose

let blogSchema = new Schema({
    title :{
        type : String, 
        required : true
    },
    author : {
        // type :String
        type : mongoose.Schema.Types.ObjectId
    },
    authorName : {
        type : String
    },
    briefDescription:{
        type : String
    },
    content :{
        type : {},
        required : true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
    ,categories : {
        type: [String]
    }
    ,
    likes :{
        type:Number
    },
    isSaved :{
        type : Boolean
    },
    comments :{
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Comment'
    }
})

const Blog = mongoose.model("Blog", blogSchema)
module.exports = Blog
