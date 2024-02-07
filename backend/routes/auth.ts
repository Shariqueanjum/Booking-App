import express from "express";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../db/models/user";
import bcrypt from "bcryptjs"


const router=express.Router();

router.post("/login",[
       check("email","Email is required").isEmail(),
       check("password","Password with 6 or more characters are acceptable").isLength({min:6})
] ,  async(req:Request,res:Response)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty())return res.status(404).json({msg:errors.array()});

    const {email,password}=req.body;

    try {
      
    const user=await User.findOne({email});
    if(!user)return res.status(404).json({msg:"Invalid Credentials"});

    const isFound=bcrypt.compare(password,user.password);
    if(!isFound)return res.status(404).json({msg:"Invalid Credentials"});

    const token=jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET_KEY as string ,
        {expiresIn:"1d"}
    );

    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
        
      res.status(200).json({msg:"LoggedIn successfully"});
    } 
    
    catch (error) {
       console.log(error);
       res.status(500).json({msg:"something went wrong"}); 
    }




})

















export default router;