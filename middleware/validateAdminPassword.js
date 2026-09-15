const { body } = require("express-validator");

const validateAdminPassword = body("admin_password")
  .notEmpty()
  .withMessage("Enter the admin password.")
  .bail()
  .custom((value) => value === process.env.ADMIN_PASSWORD)
  .withMessage("The admin password is incorrect.");

module.exports = validateAdminPassword;
