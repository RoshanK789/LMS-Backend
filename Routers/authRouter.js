import express from 'express';
import {loginuser, registerUser } from '../Controllers/authController.js';



const router = express.Router();

router.post("/register-user",registerUser)
router.post("/login-user",loginuser)


 

export default router;