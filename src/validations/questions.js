import Joi from 'joi';

 const Joi = require('joi');
 const Question = require('../models/question');

 const validateQuestion = (data) => {
   const schema = Joi.object({
     comment: Joi.string().required(),
     bid: Joi.string().pattern(/^[0-9]+$/).max(100).required(), // Regex for only digits, max length 100
     user: Joi.string().pattern(/^[a-zA-Z\s]+$/).max(100).required(), // Regex for letters and spaces, max length 100
   });

   return schema.validate(data);
 };

 const createQuestion = async (req, res) => {
   try {
     const { comment, bid, user } = req.body;

     // Validate request data against the schema
     const { error } = validateQuestion({ comment, bid, user });
     if (error) {
       return res.status(400).json({ message: error.details[0].message });
     }

     // Create a new question
     const newQuestion = await Question.create({ comment, bid, user });

     res.status(201).json({ message: 'Question created successfully', question: newQuestion });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Internal Server Error' });
   }
 };

//  const updateQuestion = async (req, res) => {
//    try {
//      const { id } = req.params;
//      const { comment, bid, user } = req.body;

//      // Validate request data against the schema
//      const { error } = validateQuestion({ comment, bid, user });
//      if (error) {
//        return res.status(400).json({ message: error.details[0].message });
//      }

//      // Find and update the question in the database
//      const updatedQuestion = await Question.findByIdAndUpdate(
//        id,
//        { comment, bid, user },
//        { new: true } // Return the updated document
//      );

//      if (!updatedQuestion) {
//        return res.status(404).json({ message: 'Question not found' });
//      }

//      res.status(200).json({ message: 'Question updated successfully', question: updatedQuestion });
//    } catch (error) {
//      console.error(error);
//      res.status(500).json({ message: 'Internal Server Error' });
//    }
//  };

 module.exports = { createQuestion, updateQuestion };

 //const validationResult = questionCreation.validate(req.body);

 const validations = {
    createQuestion,
    //updateQuestion
  };

  export default validations;