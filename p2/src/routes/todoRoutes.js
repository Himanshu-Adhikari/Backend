import express from 'express'
import db from '../db.js'


const router=express.Router()


//get all todos for loged in user
router.get('/',(req,res)=>{
    const getTodos=db.prepare('select * from todos where user_id=?')
     
    const todos=getTodos.all(req.userId);

    return res.json(todos)
})


//create a new todo

router.post('/',(req,res)=>{
    const {task}=req.body;
    const addTodo=db.prepare(`insert into todos (user_id,task) values (?,?)`)
    const result=addTodo.run(req.userId,task);
    
    res.json({id:result.lastInsertRowid,task,completed:0})
})


//update a todo
router.put('/:id',(req,res)=>{
    const {completed}=req.body
    const {id}=req.params
    const updateTodo=db.prepare(`update  todos set completed=? where id=?`)
    updateTodo.run(completed,id)

    res.json({message:"Todo Completed..."})

})


//delete a todo
router.delete('/:id',(req,res)=>{
    const {id}=req.params

    const del_todo=db.prepare(`delete from todos where id =? and user_id=?`);
    del_todo.run(id,req.userId);
    res.send({message:"todo "})
})


export default router;