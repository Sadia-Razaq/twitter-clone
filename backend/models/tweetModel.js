import mongoose from 'mongoose'

// here we will define the structure of database collection

const tweetSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true

    },
    caption: {
        type:String,
        required: false,

    },
    content: {
        type:String,
        required: false
    },
    likes: {
        type:Array,
        default: [],
    },
    shares: {
        type:Array,
        default: [],
    },

  
   
},
{
    timestamps: true, 
}
);

export default mongoose.model('Tweet', tweetSchema)