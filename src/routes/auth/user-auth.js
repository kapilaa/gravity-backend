import { Router } from "express";
import trimRequest from "trim-request"
import { verifyToken } from "../../middlewares/auth/verify-token.js";
import {
 userLogin,
 userRegister,
 userLogout
} from "../../controllers/apps/auth/index.js";
import { validate } from "../../validators/validate.js";
import { userRegisterValidator,userLoginValidator } from "../../validators/apps/auth/user.validators.js";

const router = Router();

router.route("/user-register").post(trimRequest.all,userRegisterValidator(), validate, userRegister);
router.route("/user-login").post(trimRequest.all,userLoginValidator(), validate, userLogin);
router.route("/user-logout").post(verifyToken,userLogout);

export default router;

