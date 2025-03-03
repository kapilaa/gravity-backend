import { body, param } from "express-validator";

      const userRegisterValidator = () => {
                return [
                  body("title")
                    .trim()
                    .notEmpty()
                    .withMessage("Title must be required"),

                ];
      };

export {
  userRegisterValidator
};
