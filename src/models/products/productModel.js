import { Product } from "./productSchema.js";
const ProductsCreate =async (req) => {
  try{
    const { title,price,image,category,description } = req.body;
    const newUser =await  Product.create({
      title: title,
      price:price,
      image:image,
      category:category,
      description: description,
    })
    if(newUser){
      return {type:"success",data:newUser};
    }else{
      return {type:"error",data:newUser};
    }
     
    }catch(error){
      return {type:"error",error:error};
      
    }
}

const ProductsGetRecords =async () => {
  try{
   
    const newUser =await Product.find().sort({ createdAt: -1 });
    if(newUser){
      return {type:"success",data:newUser};
    }else{
      return {type:"error",data:newUser};
    }
     
    }catch(error){
      return {type:"error",error:error};
      
    }
}

const ProductRemoved =async (id) => {
  try{
   
    const newUser =await Product.findByIdAndDelete(id)
    if(newUser){
      return {type:"success",data:newUser};
    }else{
      return {type:"error",data:newUser};
    }
     
    }catch(error){
      return {type:"error",error:error};
      
    }
}

const ProductUpdates =async (id,data) => {
  try{
    const newUser =await Product.findByIdAndUpdate(id,data,{ new: true })
    if(newUser){
      return {type:"success",data:newUser};
    }else{
      return {type:"error",data:newUser};
    }
     
    }catch(error){
      return {type:"error",error:error};
      
    }
}

const ProductSearching =async (keyword) => {
  try{
    const newUser =await Product.find({title:{'$regex': `${keyword}`}})
    if(newUser.length>0){
      return {type:"success",data:newUser};
    }else{
      return {type:"error",data:newUser};
    }
     
    }catch(error){
      return {type:"error",error:error};
      
    }
}

const ProductFilterStatusModel=async (keyword) => {
  try{
    console.log(keyword)
    const newUser =await Product.find({isCompleted:keyword}).sort({ createdAt: -1 });
    if(newUser.length>0){
      return {type:"success",data:newUser};
    }else{
      return {type:"error",data:newUser};
    }
     
    }catch(error){
      return {type:"error",error:error};
      
    }
}

const ProductChangeStatusModel=async (id,changeBy) => {
  try{
    const newUser =await Product.findByIdAndUpdate(id,{isCompleted :changeBy},{ new: true })
    if(newUser){
      return {type:"success",data:newUser};
    }else{
      return {type:"error",data:newUser};
    }
     
    }catch(error){
      return {type:"error",error:error};
      
    }
}



export {ProductsCreate,ProductsGetRecords,ProductRemoved,ProductUpdates,ProductSearching,ProductFilterStatusModel,ProductChangeStatusModel}