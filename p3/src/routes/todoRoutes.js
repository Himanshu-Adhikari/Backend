import express from 'express'
import db from '../db.js'
import prisma from '../prismaClient.js'


const router=express.Router()


//get all todos for loged in user
router.get('/',async (req,res)=>{
     const todos=await prisma.todo.findMany({
        where:{
            userId:req.userId
        }

     })

    return res.json(todos)
})


//create a new todo

router.post('/',async (req,res)=>{
    const {task}=req.body;
    const addTodo=await prisma.todo.create({
        data:{
            task,
            userId:req.userId
        }
    })
    res.json(todo )
})


//update a todo
router.put('/:id',async (req,res)=>{
    const {completed}=req.body
    const {id}=req.params
    const updateTodo=await prisma.todo.update({
        where:{
            id:parseInt(id),
            userId:req.userId
        }
        ,
        data:{
            completed:!!completed
        }
    })

    res.json(updateTodo)

})


//delete a todo
router.delete('/:id',async (req,res)=>{
    const {id}=req.params

    const del_todo=await prisma.todo.delete({
        where:{
            id:parseInt(id),
            userId:req.userId
        }
    })
    res.send(del_todo)
})


export default router;