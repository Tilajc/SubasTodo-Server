import Joi from 'joi';

const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z\s]{2,}$/;
const RGXPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const validateSuperCreation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    email: Joi.string().email(RGXEmail).required(),
    password: Joi.string().regex(RGXPassword).required()
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
    email: Joi.string().email(RGXEmail),
    password: Joi.string().regex(RGXPassword)
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
