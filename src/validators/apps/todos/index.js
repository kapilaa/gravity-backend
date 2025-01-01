import { body, param } from "express-validator";

      const todosValidator = () => {
                return [
                  body("title")
                    .trim()
                    .notEmpty()
                    .withMessage("Title must be required"),

                ];
      };

      const searchValidator = () => {
        return [
          body("search")
            .trim()
            .notEmpty()
            .withMessage("Title must be required"),

        ];
};
const statusValidator = () => {
  return [
    body("status")
      .trim()
      .notEmpty()
      .withMessage("Status value must be required in true or false"),

  ];
};

const statusChangeValidator = () => {
  return [
    body("change_by")
      .trim()
      .notEmpty()
      .withMessage("Status value must be required in true or false"),

  ];
};

export {
  todosValidator,
  searchValidator,
  statusValidator,
  statusChangeValidator
};
