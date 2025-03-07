import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const home = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "Welcome to Chat 2 Met Task API"));
});
 
export {home };
