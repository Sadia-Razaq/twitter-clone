import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 

    },
    tweet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet', 
        required: true
        
    },
    comment: {
        type: String,
        required: true,
        
    },
},
{
    timestamps:true
})


export default mongoose.model('Comment', commentSchema)
