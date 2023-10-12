import Joi from 'joi';

const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z\s]{2,}$/;
const RGXPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const questionValidateCreation = (req, res, next) => {
    const userCreation = Joi.object({
        comment: Joi.string()
        .min(3)
        .max(25)
        .pattern(/^[A-Za-z\s]+$/)
        .required()
        .messages({
          'string.pattern.base': 'First name must contain letters only',
          'string.min': 'First name can´t be shorter than 3 characters',
          'string.max': 'First name can´t be longer than 25 characters',
          'string.empty': 'First name can´t be empty'
        }),
      user: Joi.string()
        .min(3)
        .max(25)
        .pattern(/^[A-Za-z\s]+$/)
        .required()
        .messages({
          'string.pattern.base': 'First name must contain letters only',
          'string.min': 'First name can´t be shorter than 3 characters',
          'string.max': 'First name can´t be longer than 25 characters',
          'string.empty': 'First name can´t be empty'
        }),
      bid: Joi.string()
        .regex(/^[0-9]*$/)
        .min(7)
        .max(9)
        .required()
        .messages({
          'string.min': 'DNI must have 7-9 digits',
          'string.max': 'DNI must have 7-9 digits',
          'string.empty': 'DNI can´t be empty',
          'string.pattern.base': 'DNI must be only numbers'
        }),
     });
 };

 const validationResult = questionCreation.validate(req.body);

 const validations = {
    questionValidateCreation,
    //userValidateUpdate
  };

  export default validations;