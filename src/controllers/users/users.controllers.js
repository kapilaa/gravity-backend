import { asyncHandler } from "../../utils/asyncHandler.js";
import { userCreates,usersRemoved,userUpdates,userGetRecords } from "../../models/users/userModel.js";

const userCreate = asyncHandler(async (req, res) => {
    
    try{
        const dataCollector=await userCreates(req)
        if(dataCollector.type=="success"){
            res.status(201).json({success:true,message:"User created successful",data:dataCollector.data})
        }
        else{
            res.status(200).json({success:false,message:"User not created",data:[]})
        }
    
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})

const userList = asyncHandler(async (req, res) => {
    
    try{
        const dataCollector=await userGetRecords(req)
        if(dataCollector.type=="success"){
            res.status(200).json({success:true,message:"User found successful",data:dataCollector.data})
        }
        else{
            res.status(404).json({success:false,message:"User not found",data:[]})
        }
    
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})

const userDelete = asyncHandler(async (req, res) => {
    
    try{
        const dataCollector=await usersRemoved(req.params.id)
        if(dataCollector.type=="success"){
            res.status(200).json({success:true,message:"User deleted successful",data:dataCollector.data})
        }
        else{
            res.status(404).json({success:false,message:"User not found",data:[]})
        }
    
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})

const userUpdate = asyncHandler(async (req, res) => {
    
    try{
        const dataCollector=await userUpdates(req.params.id,req.body)
        if(dataCollector.type=="success"){
            res.status(200).json({success:true,message:"User updated successful",data:dataCollector.data})
        }
        else{
            res.status(404).json({success:false,message:"User not found",data:[]})
        }
    
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})



export {userCreate,userList,userDelete,userUpdate}