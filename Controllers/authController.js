import User from "../Models/userModel.js";
import Admin from "../Models/Admin.js";
import { errorHandler } from "../Utils/Error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer"

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
          console.log(userdetails);
          const userpassword=bcryptjs.compareSync(password,userdetails.password)
          if(!userdetails || !password)
            {
              return next(errorHandler(400,'Invalid Credentials'))
            }
            const token=jwt.sign({id:userdetails._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
            userdetails.token = token;
            await userdetails.save();
            const { password: passkey, ...rest } = userdetails._doc;
            res.status(200).cookie('access_token',token,{httpOnly:true,}).json({ message: "User Logined Successfully",token:token,pass:rest})
        }

        catch(error)
        {
            next(error);
        }
    }
    export const contactform = async (req, res, next) => {
      const {name,mail,phonenumber,Query } = req.body;
      if (
        !name||
        !mail ||
        !phonenumber ||
        !Query ||
        name===""||
        mail === "" ||
        phonenumber === ""||
        Query ===""
      ) {
        return next(errorHandler(400, "All the Fields Are Required"));
      }
    try{
      const transporter = nodemailer.createTransport({
        service:'gmail',
         auth: {
           user: "roshan7111999@gmail.com",
           pass: "bedq ujwg eiiw zcfz",
         }
       });
       
       const mailcontent={
         from: mail,
         to: "roshangym1999@gmail.com",
         subject: "Contactform", // Subject line
         text:"user Name :"+`${name}`+"user mail id :"+`${mail}`+"user phonenumber:"+`${phonenumber}`+"Query :"+`${Query}`
        
        
       }
       transporter.sendMail(mailcontent,function(err,val){
          if(err)
           {
             console.log(err);
           }
           else{
             console.log(val.response,"sent mail");
             res
        .status(200)
        .json({ message: "Mail send"});
           }
         });
    }
    catch(error)
    {
      next(error)
    }
     
    };

    export const Admins=async(req,res,next)=>
      {
        const {mail,password}=req.body;
        if(!mail||!password || mail=="" ||password=="")
          {
            return next(errorHandler(400, "All the Fields Are Required"));
          }
          try{
            const Admindetails=await Admin.findOne({mail});
            console.log(Admindetails);
            const userpassword=bcryptjs.compareSync(password,Admindetails.password)
            if(!Admindetails || !password)
              {
                return next(errorHandler(400,'Invalid Credentials'))
              }
              const token=jwt.sign({id:Admindetails._id},process.env.JWT_SECRET_KEY);
              res.status(200).cookie('access_token',token,{httpOnly:true,}).json({ message: "User Logined Successfully"})
          }
  
          catch(error)
          {
              next(error);
          }
      }


   