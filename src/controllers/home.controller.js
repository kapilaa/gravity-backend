import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const home = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "Welcome to Gravity Task API"));
});

export {home };
