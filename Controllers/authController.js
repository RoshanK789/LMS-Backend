import User from "../Models/userModel.js";
import { errorHandler } from "../Utils/Error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res, next) => {
    const {mail, password } = req.body;
    if (
      !mail ||
      !password ||
      mail === "" ||
      password === ""
    ) {
      return next(errorHandler(400, "All the Fields Are Required"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
  
    const newUser = new User({mail, password: hashedPassword });
    try {
      await newUser.save();
      res
        .status(200)
        .json({ message: "User Registered Successfully", result: newUser });
    } catch (error) {
      next(error);
    }
  };

  export const loginuser=async(req,res,next)=>
    {
      const {mail,password}=req.body;
      if(!mail||!password || mail=="" ||password=="")
        {
          return next(errorHandler(400, "All the Fields Are Required"));
        }
        try{
          const userdetails=await User.findOne({mail});
          const userpassword=bcryptjs.compareSync(password,userdetails.password)
          if(!userdetails || !password)
            {
              return next(errorHandler(400,'Invalid Credentials'))
            }
            const token=jwt.sign({id:userdetails._id},process.env.JWT_SECRET_KEY);
            res.status(200).cookie('access_token',token,{httpOnly:true,}).json({ message: "User Logined Successfully"})
        }

        catch(error)
        {
            next(error);
        }
    }