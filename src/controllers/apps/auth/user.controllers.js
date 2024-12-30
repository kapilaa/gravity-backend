import { handleError } from "../../../middlewares/utils/handleError.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { getUserbyId, loginModel, registerModel } from "../../../helpers/index.js";
import { User } from "../../../models/apps/auth/user.models.js";
import { ApiError } from "../../../utils/ApiError.js";

const userRegister = asyncHandler(async (req, res) => {

  const existedUser = await loginModel(req,'password')

  if (existedUser) {
    throw new ApiError(409, "email or username already exists", []);
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
    const { email, password } = req.body;
    const user = await loginModel(req,'password')
  
    if (!user) {
        return res.status(201)
          .json(
            new ApiResponse(
              201,
              false,
              {},
              "Email/UserName does not exist"
            )
          );
     
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(201).json(new ApiResponse(true,201,
        {} ,
        "Incorrect password"
      )
    );
    }
    const userData = await loginModel(req,'_id firstName lastName isActive role')
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      userData._id
    );

    return res.status(201).json(new ApiResponse(true,200,
      {userData,accessToken,refreshToken} ,
      "Users registered successfully"
    )
  );
    
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
    const token=req.auth_token

  res.status(200).json({ message: 'Logout successful' });

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