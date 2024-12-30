import { body, param } from "express-validator";

      const todosValidator = () => {
                return [
                  body("title")
                    .trim()
                    .notEmpty()
                    .withMessage("Title must be required"),

                ];
      };



export {
  todosValidator
};
