import { asyncHandler } from "../../utils/asyncHandler.js";
import { TodosCreate,TodosGetRecords,TodoRemoved,TodoUpdates } from "../../models/todos/todoModel.js";

const todoCreate = asyncHandler(async (req, res) => {
    
    try{
        const dataCollector=await TodosCreate(req)
        if(dataCollector.type=="success"){
            res.status(201).json({success:true,message:"Todos created successful",data:dataCollector.data})
        }
        else{
            res.status(200).json({success:false,message:"Todos not created",data:[]})
        }
    
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})

const todoList = asyncHandler(async (req, res) => {
    
    try{
        const dataCollector=await TodosGetRecords(req)
        if(dataCollector.type=="success"){
            res.status(200).json({success:true,message:"Todos found successful",data:dataCollector.data})
        }
        else{
            res.status(404).json({success:false,message:"Todos not found",data:[]})
        }
    
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})

const todoDelete = asyncHandler(async (req, res) => {
    
    try{
        const dataCollector=await TodoRemoved(req.params.id)
        if(dataCollector.type=="success"){
            res.status(200).json({success:true,message:"Todos deleted successful",data:dataCollector.data})
        }
        else{
            res.status(404).json({success:false,message:"Todos not found",data:[]})
        }
    
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})

const todoUpdate = asyncHandler(async (req, res) => {
    
    try{
        const dataCollector=await TodoUpdates(req.params.id,req.body)
        if(dataCollector.type=="success"){
            res.status(200).json({success:true,message:"Todos deleted successful",data:dataCollector.data})
        }
        else{
            res.status(404).json({success:false,message:"Todos not found",data:[]})
        }
    
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})

export {todoList,todoCreate,todoDelete,todoUpdate}