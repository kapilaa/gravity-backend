import { User } from "../../models/apps/auth/user.models.js";

const registerModel =async (req,res) => {
  try{
    const { firstName,lastName, email, username, password, role } = req.body;
      const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            username,
            isEmailVerified: false,
            role
      });
      return {type:"success",data:{firstName:user.firstName,lastName:user.lastName,email:user.email,isActive:user.isActive}};
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

const getUserbyId =async (req,fieldString) => {
  try{
    const userData = await  User.findById(req.userId).select(fieldString)
    return userData;
  }catch(error){
    return error;
    
  }
}

export {registerModel,loginModel,getUserbyId}