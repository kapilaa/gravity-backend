import { body, param } from "express-validator";

      const userRegisterValidator = () => {
                return [
                  body("name")
                    .trim()
                    .notEmpty()
                    .withMessage("First Name is required"),
                  body("email")
                    .trim()
                    .notEmpty()
                    .withMessage("Email is required"),
                  body("password")
                    .trim()
                    .notEmpty()
                    .withMessage("Password is required"),
                
                ];
      };

      const userLoginValidator = () => {
                return [
                  body("email")
                    .trim()
                    .notEmpty()
                    .withMessage("Email is required"),
                  body("password")
                  .notEmpty()
                  .withMessage("Password is required"),
                ];
      };


export {
  userLoginValidator,
  userRegisterValidator
};
