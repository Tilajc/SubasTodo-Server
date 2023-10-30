import Joi from 'joi';

const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z\s]{2,}$/;
const RGXPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const validateSuperCreation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    email: Joi.string().email(RGXEmail).required().messages({
      'string.empty': "Email can't be empty",
      'string.pattern.base': 'Email must be in a valid format'
    }),
    password: Joi.string().regex(RGXPassword).required().messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
      'string.empty': "Password can't be empty",
      'string.min': 'Password must be at least 8 characters long'
    })
  });

  const validation = superAdminValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `there is an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true
  });
};

const validateSuperUpdate = (req, res, next) => {
  const superValidation = Joi.object({
    email: Joi.string().email(RGXEmail).messages({
      'string.empty': "Email can't be empty",
      'string.pattern.base': 'Email must be in a valid format'
    }),
    password: Joi.string().regex(RGXPassword).messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
      'string.empty': "Password can't be empty",
      'string.min': 'Password must be at least 8 characters long'
    })
  });
  const validation = superValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There is an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true
  });
};

const validations = {
  validateSuperCreation,
  validateSuperUpdate
};

export default validations;
