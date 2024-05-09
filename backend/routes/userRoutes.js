import express from 'express'
import { findMyProfile, registerUser, userLogin } from '../controllers/usersController.js';

const router = express.Router()

router.post('/register-user', registerUser)
router.post('/user-login', userLogin)
router.get('/my-profile/:id', findMyProfile)



export default router;