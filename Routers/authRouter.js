import express from 'express';
import {Admins, contactform, loginuser, registerUser } from '../Controllers/authController.js';



const router = express.Router();

router.post("/register-user",registerUser)
router.post("/login-user",loginuser)
router.post("/contactform-user",contactform)
router.post("/Admin",Admins)

 

export default router;