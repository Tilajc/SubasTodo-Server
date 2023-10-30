import Joi from 'joi';

const validateQuestion = (req, res, next) => {
  const createQuestion = Joi.object({
    comment: Joi.string().required().min(10).max(50).messages({
      'string.min': "Comment can't be shorter than 10 characters",
      'string.max': "Comment can't be longer than 50 characters",
      'string.empty': "Comment can't empty"
    }),
    bid: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/),
    user: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
  });

  const validationResult = createQuestion.validate(req.body);

  if (!validationResult.error) return next();
  const errorMessage = validationResult.error.details.map((details) => details.message);

  return res.status(400).json({
    message: `There was en error ${errorMessage.join(', ')}`,
    data: undefined,
    error: true
  });
};

const validateUpdateQuestion = (req, res, next) => {
  const updateQuestion = Joi.object({
    comment: Joi.string().required().min(10).max(50).messages({
      'string.min': "Comment can't be shorter than 10 characters",
      'string.max': "Comment can't be longer than 50 characters",
      'string.empty': "Comment can't empty"
    }),
    bid: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/),
    user: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
  });

  const validationResult = updateQuestion.validate(req.body);

  if (!validationResult.error) return next();
  const errorMessage = validationResult.error.details.map((details) => details.message);

  return res.status(400).json({
    message: `There was en error ${errorMessage.join(', ')}`,
    data: undefined,
    error: true
  });
};
const validations = {
  validateQuestion,
  validateUpdateQuestion
};

export default validations;
