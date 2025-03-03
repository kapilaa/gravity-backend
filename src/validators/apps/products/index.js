import { body, param } from "express-validator";

      const productValidator = () => {
                return [
                  body("title")
                    .trim()
                    .notEmpty()
                    .withMessage("Title must be required"),
                    body("image")
                    .trim()
                    .notEmpty()
                    .withMessage("Image must be required"),
                    body("price")
                    .trim()
                    .notEmpty()
                    .withMessage("Price must be required"),
                    body("category")
                    .trim()
                    .notEmpty()
                    .withMessage("Category must be required"),
                    body("description")
                    .trim()
                    .notEmpty()
                    .withMessage("Description must be required"),

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
  productValidator,
  searchValidator,
  statusValidator,
  statusChangeValidator
};
