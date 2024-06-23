import mongoose from 'mongoose'

const saveSchema  = mongoose.Schema({
    tweet_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type:String,
        required: true
    }
},
{
    timestamps: true,
})



export default mongoose.model('Saved', saveSchema )