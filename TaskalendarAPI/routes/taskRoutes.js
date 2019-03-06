const express=require('express');
const router=express.Router();
const Task=require('../models/Task');
const User=require('../models/User');
const reqmiddleware=require('../middlewares/reqlogger');

//http:localhost:3000/tasks?lte=12321000&gte01231231000

router.get('/',(req,res)=>{
    let lte=req.query.lte;
    let gte=req.query.gte;

    Task.find({dayId:{$gte:gte,$lte:lte}},(err,tasks)=>{
        if(err){
            res.status(500).json({message:err,isSuccessfull:false});
        }else{
            res.status(200).json({message:'Getting Todos',isSuccessfull:true,data:tasks});
        }
    })
});

router.get('/:dayId',(req,res)=>{
    let dayId=req.params.dayId;
    Task.findOne({dayId:dayId},(err,task)=>{
        if(err){
            res.status(500).json({message:err,isSuccessfull:false});
        }else{
            res.status(200).json({message:'Getting Todos',isSuccessfull:true,data:task});
        }
    })
});

router.post('/AddOrUpdate',(req,res)=>{
    let task=req.body;
    Task.findOneAndUpdate({dayId:task.dayId},task,{upsert:true},(err,task,resp)=>{
        if(err){
            res.status(500).json({message:err,isSuccessfull:false});
        }else{
            res.status(200).json({message:'Task updated',isSuccessfull:true});
        }
    });

});


router.post('/UpdateTodo',(req,res)=>{
    let todo=req.body;
    console.log(todo);
    Task.findOneAndUpdate({'todos.id':todo.id},{'$set':{'todos.0.todo':todo.todo,'todos.0.isDone':todo.isDone}},{upsert:true},(err,task,resp)=>{
        if(err){
            res.status(500).json({message:err,isSuccessfull:false});
        }else{
            res.status(200).json({message:'Todo updated',isSuccessfull:true});
        }
    });
});


module.exports=router;