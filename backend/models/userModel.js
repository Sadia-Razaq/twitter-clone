import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'please enter the email'],
    },
    email: {
        type:String,
        required: [true, 'please enter the email'],
    },
    dob: {
        type:String,
        required: true,
    },
    password: {
        type:String,
        default: null,
    },
   
},
{
    timestamps:true
})



export default mongoose.model('User', userSchema)