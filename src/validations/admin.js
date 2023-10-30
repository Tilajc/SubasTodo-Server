import Joi from 'joi';

const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z\s]{2,}$/;
const RGXPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const adminValidateCreation = (req, res, next) => {
  const adminCreation = Joi.object({
    profilePhoto: Joi.string(),
    firstName: Joi.string()
      .min(3)
      .max(25)
      .pattern(/^[A-Za-z\s]+$/)
      .required()
      .messages({
        'string.pattern.base': 'First name must contain letters only',
        'string.min': "First name can't be shorter than 3 characters",
        'string.max': "First name can't be longer than 25 characters",
        'string.empty': "First name can't be empty"
      }),
    lastName: Joi.string()
      .min(3)
      .max(25)
      .pattern(/^[A-Za-z\s]+$/)
      .required()
      .messages({
        'string.pattern.base': 'First name must contain letters only',
        'string.min': "First name can't be shorter than 3 characters",
        'string.max': "First name can't be longer than 25 characters",
        'string.empty': "First name can't be empty"
      }),
    dni: Joi.string()
      .regex(/^[0-9]*$/)
      .min(7)
      .max(9)
      .required()
      .messages({
        'string.min': 'DNI must have 7-9 digits',
        'string.max': 'DNI must have 7-9 digits',
        'string.empty': "DNI can't be empty",
        'string.pattern.base': 'DNI must be only numbers'
      }),
    phone: Joi.string()
      .regex(/^[0-9]*$/)
      .length(10)
      .required()
      .messages({
        'string.length': 'Phone number must have 10 digits',
        'string.empty': "Phone number can't be empty",
        'string.pattern.base': 'Phone number must be only numbers'
      }),
    email: Joi.string().regex(RGXEmail).required().messages({
      'string.empty': "Email can't be empty",
      'string.pattern.base': 'Email must be in a valid format'
    }),
    password: Joi.string().min(8).regex(RGXPassword).required().messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
      'string.empty': "Password can't be empty",
      'string.min': 'Password must be at least 8 characters long'
    })
  });

  const validationResult = adminCreation.validate(req.body);

  if (!validationResult.error) return next();
  const errorMessage = validationResult.error.details.map((details) => details.message);

  return res.status(400).json({
    message: `There was en error ${errorMessage.join(', ')}`,
    data: undefined,
    error: true
  });
};

const adminValidateUpdate = (req, res, next) => {
  const adminUpdate = Joi.object({
    profilePhoto: Joi.string(),
    firstName: Joi.string()
      .min(3)
      .max(25)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        'string.pattern.base': 'First name must contain letters only',
        'string.min': "First name can't be shorter than 3 characters",
        'string.max': "First name can't be longer than 25 characters",
        'string.empty': "First name can't be empty"
      }),
    lastName: Joi.string()
      .min(3)
      .max(25)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        'string.pattern.base': 'First name must contain letters only',
        'string.min': "First name can't be shorter than 3 characters",
        'string.max': "First name can't be longer than 25 characters",
        'string.empty': "First name can't be empty"
      }),
    dni: Joi.string()
      .regex(/^[0-9]*$/)
      .min(7)
      .max(9)
      .messages({
        'string.min': 'DNI must have 7-9 digits',
        'string.max': 'DNI must have 7-9 digits',
        'string.empty': "DNI can't be empty",
        'string.pattern.base': 'DNI must be only numbers'
      }),
    phone: Joi.string()
      .regex(/^[0-9]*$/)
      .length(10)
      .messages({
        'string.length': 'Phone number must have 10 digits',
        'string.empty': "Phone number can't be empty",
        'string.pattern.base': 'Phone number must be only numbers'
      }),
    email: Joi.string().regex(RGXEmail).required().messages({
      'string.empty': "Email can't be empty",
      'string.pattern.base': 'Email must be in a valid format'
    }),
    password: Joi.string().min(8).regex(RGXPassword).required().messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
      'string.empty': "Password can't be empty",
      'string.min': 'Password must be at least 8 characters long'
    })
  });

  const validationResult = adminUpdate.validate(req.body);

  if (!validationResult.error) return next();
  const errorMessage = validationResult.error.details.map((details) => details.message);

  return res.status(400).json({
    message: `There was en error: ${errorMessage.join(', ')}`,
    data: undefined,
    error: true
  });
};

const validations = {
  adminValidateCreation,
  adminValidateUpdate
};

export default validations;
