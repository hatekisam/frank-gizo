const { JSONCookies } = require("cookie-parser");
const joi = require("joi");

const validateUser = (user) => {
  const schema = joi.object({
    fullName: joi.string().min(3).required(),
    email: joi.string().email(),
    password: joi
      .string()
      .pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>?]).{8,}$/
      )
      .required(),
  });
  return schema.validate(user);
};
const validateEmployee = (employee) => {
  const schema = joi.object({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    NID: joi.string().length(16).required(),
    telephone: joi.string().length(10).required(),
    email: joi.string().email().required(),
    department: joi.number().required(),
    position: joi.string().required(),
    laptop: joi.string().required()
  });
    return schema.validate(employee);
}



module.exports = {validateUser, validateEmployee};
