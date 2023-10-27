import Joi from 'joi';

const bidValidateCreation = (req, res, next) => {
  const bidCreation = Joi.object({
    bidOwner: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
    product: Joi.object({
      title: Joi.string().min(3).max(20).required().messages({
        'string.min': "Title can't be shorter than 3 characters",
        'string.max': "Title can't be longer than 25 characters",
        'string.empty': "Title can't be empty"
      }),
      description: Joi.string().min(5).max(70).required().messages({
        'string.min': "Description can't be shorter than 5 characters",
        'string.max': "Description can't be longer than 70 characters",
        'string.empty': "Description can't be empty"
      }),
      photo: Joi.string().required().messages({
        'string.empty': "Photo can't be empty"
      })
    }),
    timeLimit: Joi.number().min(2).max(30).required().messages({
      'number.min': "Time limit can't be less than 2 days",
      'number.max': "Time limit can't be more than 30 days",
      'number.empty': "Time limit can't be empty"
    }),
    price: Joi.number().min(0).required().messages({
      'number.min': "Price can't be less than 0",
      'number.empty': "Price can't be empty"
    })
  });

  const validationResult = bidCreation.validate(req.body);

  if (!validationResult.error) return next();
  const errorMessage = validationResult.error.details.map((details) => details.message);

  return res.status(400).json({
    message: `There was en error ${errorMessage.join(', ')}`,
    data: undefined,
    error: true
  });
};

const bidValidateUpdate = (req, res, next) => {
  const bidCreation = Joi.object({
    product: Joi.object({
      title: Joi.string().min(3).max(20).messages({
        'string.min': "Title can't be shorter than 3 characters",
        'string.max': "Title can't be longer than 25 characters",
        'string.empty': "Title can't be empty"
      }),
      description: Joi.string().min(5).max(70).messages({
        'string.min': "Description can't be shorter than 5 characters",
        'string.max': "Description can't be longer than 70 characters",
        'string.empty': "Description can't be empty"
      }),
      photo: Joi.string().required().messages({
        'string.empty': "Photo can't be empty"
      })
    }),
    timeLimit: Joi.number().min(2).max(30).messages({
      'number.min': "Time limit can't be less than 2 days",
      'number.max': "Time limit can't be more than 30 days",
      'number.empty': "Time limit can't be empty"
    }),
    price: Joi.number().min(0).messages({
      'number.min': "Price can't be less than 0"
    })
  });

  const validationResult = bidCreation.validate(req.body);

  if (!validationResult.error) return next();
  const errorMessage = validationResult.error.details.map((details) => details.message);

  return res.status(400).json({
    message: `There was en error ${errorMessage.join(', ')}`,
    data: undefined,
    error: true
  });
};

const validations = {
  bidValidateCreation,
  bidValidateUpdate
};

export default validations;
