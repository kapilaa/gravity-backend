import { body, param } from "express-validator";

      const userRegisterValidator = () => {
                return [
                  body("firstName")
                    .trim()
                    .notEmpty()
                    .withMessage("First Name is required"),
                  body("lastName")
                    .trim()
                    .notEmpty()
                    .withMessage("First Name is required"),
                  body("email")
                    .trim()
                    .notEmpty()
                    .withMessage("Email/Username is required"),
                  body("password")
                    .trim()
                    .notEmpty()
                    .withMessage("Password is required"),
                  body("role")
                    .trim()
                    .notEmpty()
                    .withMessage("Role is required")
                
                ];
      };

      const userLoginValidator = () => {
                return [
                  body("email")
                    .trim()
                    .notEmpty()
                    .withMessage("Email is required"),
                  body("password").notEmpty().withMessage("Password is required"),
                ];
      };


export {
  userLoginValidator,
  userRegisterValidator
};
