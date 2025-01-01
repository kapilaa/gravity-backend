import { asyncHandler } from "../../utils/asyncHandler.js";
import { 
         TodosCreate,
         TodosGetRecords,
         TodoRemoved,
         TodoUpdates,
         todoSearching,
         todoFilterStatusModel,
         todoChangeStatusModel
         } from "../../models/todos/todoModel.js";

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

const todoSearch = asyncHandler(async (req, res) => {
    
    try{
        const dataCollector=await todoSearching(req.body.search)
        if(dataCollector.type=="success"){
            res.status(200).json({success:true,message:"Todos found successful",data:dataCollector.data})
        }
        else{
            res.status(200).json({success:false,message:"Todos not found",data:[]})
        }
    
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})

const todoFilterStatus = asyncHandler(async (req, res) => {
    
    try{
        if (req.body.status == 'true' || req.body.status == 'false') {
        const dataCollector=await todoFilterStatusModel(req.body.status)
        if(dataCollector.type=="success"){
            res.status(200).json({success:true,message:"Todos found successful",data:dataCollector.data})
        }
        else{
            res.status(200).json({success:false,message:"Todos not found",data:[]})
        }
    }else{
        res.status(200).json({success:false,message:"Invalid filter type",data:[]})
    }
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})

const todoChangeStatus = asyncHandler(async (req, res) => {
    
    try{
        if (req.body.change_by == 'true' || req.body.change_by == 'false') {
        const dataCollector=await todoChangeStatusModel(req.params.id,req.body.change_by)
        if(dataCollector.type=="success"){
            res.status(200).json({success:true,message:"Todos found successful",data:dataCollector.data})
        }
        else{
            res.status(200).json({success:false,message:"Todos not found",data:[]})
        }
    }else{
        res.status(200).json({success:false,message:"Invalid filter type",data:[]})
    }
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})



export {todoList,todoCreate,todoDelete,todoUpdate,todoSearch,todoFilterStatus,todoChangeStatus}