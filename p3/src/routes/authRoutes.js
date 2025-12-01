 import express from 'express'
 import bcrypt from 'bcryptjs'
 import jwt from 'jsonwebtoken'
 import db from '../db.js'
import prisma from '../prismaClient.js'
import { use } from 'react'

 const router=express.Router()

//register a new user
router.post('/register',async (req,res)=>{
    const {username,password }= req.body;

    //we save the username and irreversibly encrypted password
    const hasshed_password=bcrypt.hashSync(password,8); 

    console.log(`someone came at the door ${username} with password ${password}`)
    console.log(`we have a sce key as well ${hasshed_password}`)

    try{
        // const getuser=db.prepare('SELECT * FROM users WHERE username = ?') 
        // const user=getuser.get(username);

        //If no user with this name in DB 
        if(user){
           return res.status(404).send('User already present please login...')
        }
        const user=await prisma.user.create({
            data:{
                username,
                password:hasshed_password
            }
        })

        const defaultTodo=`Hello :) Add your starter Todo...`
        await prisma.todo.create({
            data:{
                task:defaultTodo,
                userId:user.id
            }
        }) 

        //token creation
        const token=jwt.sign({id:user.id},process.env.JWT_Secret,{expiresIn:'24h'})
        res.json({token})    
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(503);
    }
}) 

router.post('/login',async (req,res)=>{
    //we get username and the encrypted passsword and match that with the encrypted version of the
    //entered password by the user cause we can't decrypt it
    const {username,password}=req.body;
    try{
        const user=await prisma.user.findUnique({
            where:{
                username:username
            }
        })

        //If no user with this name in DB 
        if(!user){
            return res.status(404).json({message:'User not found'});
        }

        //check password entered with db password
        const passsword_check=bcrypt.compareSync(password,user.password);
        if(!passsword_check){
            return res.status(401).json("Password Invalid!!")
        }

        console.log(user);
        //we had a successfull login
        const token=jwt.sign({id:user.id},process.env.JWT_Secret,{expiresIn:'24h'});
        res.json({token});    
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(503); 
    }
})

 export default router;