import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


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
            res.json({
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                dob: createdUser.dob,
                password: createdUser. password,
                token: generateToken(createdUser._id),
                location:newUser?.location,
                image:newUser?.image,
                coverImage:newUser?.coverImage,
                website:newUser?.website,
                createdAt:newUser?.createdAt




            });
    
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
        res.json({
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            dob: findUser.dob,
            password: findUser. password,
            token: generateToken(findUser._id),
            location:findUser?.location,
            image:findUser?.image,
            coverImage:findUser?.coverImage,
            website:findUser?.website,
            createdAt:findUser?.createdAt

        });
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




const findAllUsers = AsyncHandler(async(req,res) => {
    const allUsers = await User.find();
    res.send(allUsers)
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
}



export {
    registerUser, 
    userLogin,
    findMyProfile,
    findAllUsers
} 