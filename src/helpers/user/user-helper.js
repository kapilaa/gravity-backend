import { User } from "../../models/apps/auth/user.models.js";

const registerModel =async (req,res) => {
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


const loginModel =async (req,fieldString) => {
  try{
    const email=req.body.email;
    const userData = await User.findOne({
      $and: [{ email }],
    }).select(fieldString)
    return userData;
  }catch(error){
    return error;
    
  }
}

const getUserbyId =async (userId,fieldString) => {
  try{
    const userData = await  User.findById(userId).select(fieldString)
    return userData;
  }catch(error){
    return error;
    
  }
}

export {registerModel,loginModel,getUserbyId}