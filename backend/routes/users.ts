import jwt from "jsonwebtoken";
import User from "../db/models/user";
import express from "express";
import { Request ,Response } from "express";
import { check, validationResult } from "express-validator";

const router=express.Router();




router.post("/register",[
    check("firstName","First Name is required").isString(),
    check("lastName","Last Name is required").isString(),
    check("email","Email is required").isEmail(),
    check("password","Password with 6 or more is acceptable").isLength({min:6}),
      ], async(req:Request,res:Response)=>{
       
      const errors=validationResult(req);
      if(!errors.isEmpty())return res.status(404).json({msg:errors.array()});





   try {
    const user=await User.findOne({email:req.body.email});

    if(user){
        return res.status(400).json({msg:"user already exist"});
    }
    const newUser=new User(req.body);
     await newUser.save();

     const token = jwt.sign(
        { userId: newUser.id },
        process.env.JWT_SECRET_KEY as string ,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res.status(200).json({msg:"user registered successfully"});

        }
 catch (error) {
       console.log(error);
       res.status(500).json({msg:"something went wrong"});
   } 
})








export default router;