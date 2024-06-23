import jwt from 'jsonwebtoken'
 import AsyncHandler from 'express-async-handler'
 import User from '../models/userModel.js'


 const authMiddleware = AsyncHandler(async(req,res,next)=> {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.id);
            next();

        } catch (error) {
            throw new Error("Wrong token")
        }
    }else{
        throw new Error("No token found!")
    }
 })

 export default authMiddleware;