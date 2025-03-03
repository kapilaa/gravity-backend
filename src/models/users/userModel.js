import { User } from "../apps/auth/user.models.js";

const userCreates =async (req) => {
 try{
     const { name, email, password } = req.body;
       const user = await User.create({
             name,
             email,
             password
       });
       return {type:"success",data:{name:user.name,email:user.email}};
     }catch(error){
       return {type:"error",error:error};
       
     }
}

const userGetRecords =async () => {
  try{
   
    const newUser =await User.find().sort({ createdAt: -1 });
    if(newUser){
      return {type:"success",data:newUser};
    }else{
      return {type:"error",data:newUser};
    }
     
    }catch(error){
      return {type:"error",error:error};
      
    }
}

const usersRemoved =async (id) => {
  try{
   
    const newUser =await User.findByIdAndDelete(id)
    if(newUser){
      return {type:"success",data:newUser};
    }else{
      return {type:"error",data:newUser};
    }
     
    }catch(error){
      return {type:"error",error:error};
      
    }
}

const userUpdates =async (id,data) => {
  try{
   const dataUpdate={
    name:data.name,
    email:data.email,
    password:data.password,
}
    const newUser =await User.findByIdAndUpdate(id,dataUpdate,{ new: true })
    if(newUser){
      return {type:"success",data:newUser};
    }else{
      return {type:"error",data:newUser};
    }
     
    }catch(error){
      return {type:"error",error:error};
      
    }
}




export {userCreates,userGetRecords,usersRemoved,userUpdates}