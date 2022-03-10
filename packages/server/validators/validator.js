import { check } from "express-validator";
export const registerValidation = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Incorrect email format")
    .isLength({ min: 4, max: 128 })
    .withMessage("Must be between 4 and 128 characters"),
  check("username")
    .not()
    .isEmpty()
    .withMessage("Please enter your username")
    .isLength({ min: 4, max: 128 })
    .withMessage("Must be between 4 and 128 characters"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Please fill in your password")
    .isLength({ min: 4, max: 128 })
    .withMessage("Must be between 4 and 128 characters"),
  check("passwordConfirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    } else {
      return value;
    }
  }),
  check("passwordConfirm")
    .not()
    .isEmpty()
    .withMessage("Please confirm your password"),
];
export const authValidation = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Incorrect email format")
    .isLength({ min: 4, max: 128 })
    .withMessage("Must be between 4 and 128 characters"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Please fill in your password")
    .isLength({ min: 4, max: 128 })
    .withMessage("Must be between 4 and 128 characters"),
];
export const createRentalValidation = [
  check("title")
    .not()
    .isEmpty()
    .withMessage("Please enter a title for this rental"),
  check("description")
    .not()
    .isEmpty()
    .withMessage("Please describe this property")
    .isLength({ min: 4, max: 128 })
    .withMessage("Description must be between 4 and 128 characters"),
  check("city")
    .not()
    .isEmpty()
    .withMessage("Please enter the city of this rental"),
  check("street")
    .not()
    .isEmpty()
    .withMessage("Please provide the street name of this rental"),
  check("bedrooms")
    .not()
    .isEmpty()
    .withMessage("Please enter the number of bedrooms"),
  check("dailyRate")
    .not()
    .isEmpty()
    .withMessage("Please enter a price you wish"),
];
