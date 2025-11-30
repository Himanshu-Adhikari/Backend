 import express from 'express'
 import bcrypt from 'bcryptjs'
 import jwt from 'jsonwebtoken'
 import db from '../db.js'

 const router=express.Router()

//register a new user
router.post('/register',(req,res)=>{
    const {username,password }= req.body;
    //we save the username and irreversibly encrypted password
    const hasshed_password=bcrypt.hashSync(password,8); 

    console.log(`someone came at the door ${username} with password ${password}`)
    console.log(`we have a sce key as well ${hasshed_password}`)

    try{
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);
        const result=insertUser.run(username, hasshed_password);

        const defaultTodo=`Hello :) Add your starter Todo...`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`);

        insertTodo.run(result.lastInsertRowid,defaultTodo); 

        //token creation
        const token=jwt.sign({id:result.lastInsertRowid},process.env.JWT_Secret,{expiresIn:'24h'})
        res.json({token})    
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(503);
    }

    res.sendStatus(201)
}) 

router.post('/login',(req,res)=>{
    //we get username and the encrypted passsword and match that with the encrypted version of the
    //entered password by the user cause we can't decrypt it
    const {username,password}=req.body;
    try{
        const getuser=db.prepare('select * from users where username=?');
        const user=getuser.get(username);

        //If no user with this name in DB 
        if(!user){
            return res.status(404).send({message:'User not found'});
        }

        //check password entered with db password
        const passsword_check=bcrypt.compareSync(password,user.passsword);
        if(!passsword_check){
            return res.status(401)._construct.send("Password Invalid!!")
        }

    }
    catch(err){
        console.log(err.message);
        res.sendStatus(503); 
    }
})

 export default router;