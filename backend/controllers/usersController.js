import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'


const registerUser = AsyncHandler(async (req, res) => {

    const {name, email, dob, password} = req.body;

    //email exists

    const checkUser = await User.findOne({email})

    if(checkUser) {
        res.status(400)
        throw new Error('Email is already registered!')
    }

    if(!name || !email || !dob || !password){
        res.status(400)
        throw new Error('Please enter the relevant fields!')
    }else{
        try{

            //bcrypt says encryption will be more refined if the word salt is added.
            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(password, salt)
            const createdUser = await  User.create({
                name,email,dob,password:hashedPass
            })
            res.send(createdUser)
    
        }
        catch (error){
            console.log(error)
        }
    }
    
})



const userLogin = AsyncHandler(async (req,res)=> {
const {email,password} = req.body;

if(!email || !password){
    res.status(400)
    throw new Error('Please enter the relevant fields.')
}
const findUser = await User.findOne({ email })
if(!findUser){
    res.status(404)
    throw new Error('invalid email!')
}else{

    let passwordMatch = await bcrypt.compare(password,findUser.password)
    if(!passwordMatch){
        res.status(401)
        throw new Error('Invalid Password!')
    }else{
        res.send(findUser)
    }
}
})


const findMyProfile = AsyncHandler(async (req,res) => {
    const user_id = req.params.id;
    const userExists = await User.findOne({ _id: user_id});

    if(!userExists){
        res.status(404)
        throw new Error('User does not exist!')
    }else{
        res.send(userExists)
    }



})



export {registerUser, userLogin,findMyProfile} 