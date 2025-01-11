import catchAsync from "../../utils/catchAsync";
import successResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  successResponse(res, {
    statusCode: 200,
    success: true,
    message: "User login successful",
    data: result,
  });
});

export const authControllers = {
  loginUser,
};
