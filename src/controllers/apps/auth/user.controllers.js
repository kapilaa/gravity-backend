import { handleError } from "../../../middlewares/utils/handleError.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { getUserbyId, loginModel, registerModel } from "../../../helpers/index.js";
import { User } from "../../../models/apps/auth/user.models.js";
import { ApiError } from "../../../utils/ApiError.js";
import jwt from 'jsonwebtoken';
import Blacklist from "../../../models/blacklist/index.js";
const userRegister = asyncHandler(async (req, res) => {

  const existedUser = await loginModel(req,'password')

   if (existedUser) {
      return res.status(201).json({success:false,message:"Email already exists.Try with different email."
      })
    }

  const response=await registerModel(req,res);
  if(response.type=='success'){
        return res.status(201).json(new ApiResponse(true,200,
            response.data ,
            "Users registered successfully"
          )
        );
  }else if (response.type == "error")
  return res.status(201)
  .json(
    new ApiResponse(
      201,
      false,
      {},
      response.error.code==11000?"This email is already registered":response.error
    )
  );

})
const userLogin = async (req, res) => {
  try {
    const { password } = req.body;
    const userEmail = await loginModel(req,'password')
    
    if (!userEmail) {
      return res.status(200).json({success:false,statusCode:200, message: 'Email not found' });
    }
    const isPasswordValid = await userEmail.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(200).json({success:false, message: 'Invalid password' });
    }
    
    const userData=await getUserbyId(userEmail._id,'_id name email')
    const token = jwt.sign({ userId: userData._id,name:userData.name,email:userData.email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({success:true, message: 'You are logged In successful.',auth_token: token,user_data:userData });
    
  } catch (error) {
    handleError(res, error) 
  }
}


const myProfileInfo = async (req, res) => {
  try {
    const user = await getUserbyId(req,'_id firstName lastName isActive role')
    return res.status(201).json(new ApiResponse(true,200,
      {user} ,
      "Data received succcessfully."
    )
  );
    
  } catch (error) {
    handleError(res, error)
  }
}

const userLogout = async (req, res) => {
  try {
    // const token=req.auth_token
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(400).json({success:false, message: 'No token provided'+token });
      
    }
    const blacklistedToken =new Blacklist({token})
    blacklistedToken
    .save()
    .then(() => {
      res.json({success:true, message: 'Logged out successfully' });
    })
    .catch((err) => {
      res.status(500).json({success:false, message: 'Server error' });
    })

  } catch (err) {
    return new ApiError(
      500,
      "Something went wrong while generating the access token"+err
    );
  }

}

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    return ApiError(
      500,
      "Something went wrong while generating the access token"
    );
    
  }
};

export {userRegister,userLogin,myProfileInfo,userLogout}