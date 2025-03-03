import { asyncHandler } from "../../utils/asyncHandler.js";
import { 
         ProductsCreate,
         ProductsGetRecords,
         ProductRemoved,
         ProductUpdates,
         ProductSearching,
         ProductFilterStatusModel,
         ProductChangeStatusModel
         } from "../../models/products/productModel.js";

const productCreate = asyncHandler(async (req, res) => {
    
    try{
        const dataCollector=await ProductsCreate(req)
        if(dataCollector.type=="success"){
            res.status(201).json({success:true,message:"Product created successful",data:dataCollector.data})
        }
        else{
            res.status(200).json({success:false,message:"Product not created",data:[]})
        }
    
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})

const productList = asyncHandler(async (req, res) => {
    
    try{
        const dataCollector=await ProductsGetRecords(req)
        if(dataCollector.type=="success"){
            res.status(200).json({success:true,message:"Products found successful",data:dataCollector.data})
        }
        else{
            res.status(404).json({success:false,message:"Products not found",data:[]})
        }
    
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})

const productDelete = asyncHandler(async (req, res) => {
    
    try{
        const dataCollector=await ProductRemoved(req.params.id)
        if(dataCollector.type=="success"){
            res.status(200).json({success:true,message:"Product deleted successful",data:dataCollector.data})
        }
        else{
            res.status(404).json({success:false,message:"Product not found",data:[]})
        }
    
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})

const productUpdate = asyncHandler(async (req, res) => {
    
    try{
        const dataCollector=await ProductUpdates(req.params.id,req.body)
        if(dataCollector.type=="success"){
            res.status(200).json({success:true,message:"Product updated successful",data:dataCollector.data})
        }
        else{
            res.status(404).json({success:false,message:"Product not found",data:[]})
        }
    
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})

const productSearch = asyncHandler(async (req, res) => {
    
    try{
        const dataCollector=await ProductSearching(req.body.search)
        if(dataCollector.type=="success"){
            res.status(200).json({success:true,message:"Products found successful",data:dataCollector.data})
        }
        else{
            res.status(200).json({success:false,message:"Products not found",data:[]})
        }
    
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})

const productFilterStatus = asyncHandler(async (req, res) => {
    
    try{
        if (req.body.status == 'true' || req.body.status == 'false') {
        const dataCollector=await ProductFilterStatusModel(req.body.status)
        if(dataCollector.type=="success"){
            res.status(200).json({success:true,message:"Products found successful",data:dataCollector.data})
        }
        else{
            res.status(200).json({success:false,message:"Products not found",data:[]})
        }
    }else{
        res.status(200).json({success:false,message:"Invalid filter type",data:[]})
    }
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})

const productChangeStatus = asyncHandler(async (req, res) => {
    
    try{
        if (req.body.change_by == 'true' || req.body.change_by == 'false') {
        const dataCollector=await ProductChangeStatusModel(req.params.id,req.body.change_by)
        if(dataCollector.type=="success"){
            res.status(200).json({success:true,message:"Product found successful",data:dataCollector.data})
        }
        else{
            res.status(200).json({success:false,message:"Products not found",data:[]})
        }
    }else{
        res.status(200).json({success:false,message:"Invalid filter type",data:[]})
    }
    }catch(error){
        res.status(200).json({success:true,message:error,data:[]})
    }
    
})



export {productList,productCreate,productDelete,productUpdate,productSearch,productFilterStatus,productChangeStatus}