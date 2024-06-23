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
    image:{
        type:String,
        required: false,
        default: "https://www.tidalhealthcare.com/wp-content/uploads/2017/07/default-user.png",

    },
    coverImage:{
        type:String,
        required: false,
        default: "https://blog.contentstudio.io/wp-content/uploads/2022/04/twitter-header.jpg",
        
    },
    location: {
        type:String,
        required:false,
        default:'Islamabad, Pakistan'
    },
    website :{
        type:String,
        required:false,
        default:null,
    }
   
},
{
    timestamps:true
})



export default mongoose.model('User', userSchema)