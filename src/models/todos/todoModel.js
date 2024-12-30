import { Todo } from "./todosSchema.js";

const TodosCreate =async (req) => {
  try{
    const { title,description } = req.body;
   
    const newUser =await  Todo.create({
      title:title,
      description:description
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

const TodosGetRecords =async () => {
  try{
   
    const newUser =await Todo.find().sort({ createdAt: -1 });
    if(newUser){
      return {type:"success",data:newUser};
    }else{
      return {type:"error",data:newUser};
    }
     
    }catch(error){
      return {type:"error",error:error};
      
    }
}

const TodoRemoved =async (id) => {
  try{
   
    const newUser =await Todo.findByIdAndDelete(id)
    if(newUser){
      return {type:"success",data:newUser};
    }else{
      return {type:"error",data:newUser};
    }
     
    }catch(error){
      return {type:"error",error:error};
      
    }
}

const TodoUpdates =async (id,data) => {
  try{
   
    const newUser =await Todo.findByIdAndUpdate(id,data,{ new: true })
    if(newUser){
      return {type:"success",data:newUser};
    }else{
      return {type:"error",data:newUser};
    }
     
    }catch(error){
      return {type:"error",error:error};
      
    }
}

export {TodosCreate,TodosGetRecords,TodoRemoved,TodoUpdates}