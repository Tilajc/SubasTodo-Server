import Questions from "../models/Questions";
import Users from "../models/Users";

const getAllQuestions = async (req, res) => {
    try {
      const questions = await Questions.find.populate('Users');
      return res.status(200).json({
        message: 'Question found!',
        data: Questions,
        error: false,
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
        data: undefined,
        error: true,
      });
    }
  };

  const getQuestionById  = async (req, res) => {
    try {
        const { id } = req.params;
        const idQuestion = await Questions.findOne({ $and: [{ _id: id }] })
          .populate('User');
        if (!idQuestion) {
          return res.status(404).json({
            message: `Question with ID ${id} was not found`,
            data: undefined,
            error: true,
          });
        }
        return res.status(200).json({
          message: `Question with ID ${idQuestion.id} was found!`,
          data: idQuestion,
          error: false,
        });
      } catch (error) {
        return res.status(500).json({
          message: error,
          data: undefined,
          error: true,
        });
      }
    };

    const createQuestion = async (req, res) => {
        try {
          const {
            user, comment, bid
          } = req.body;
          const UsersExist = await Users.findById(user);
          if (UsersExist === null) {
            return res.status(404).json({
              message: 'There is no user with that ID',
              data: undefined,
              error: true,
            });
          }
          const existingQuestion = await Questions.findOne({
            comment,
            bid,
            user,
          });
          if (existingQuestion) {
            return res.status(400).json({
              message: 'Question is already',
              data: undefined,
              error: true,
            });
          }
          const questionExist = await Questions.findById(question);
          if (questionExist === null) {
            return res.status(404).json({
              message: 'There is no Question with that ID',
              data: undefined,
              error: true,
            });
          }
          const newQuestion = await Questions.create({
            comment,
            bid,
            user,
          });
          return res.status(201).json({
            message: `Question with ID ${newQuestion.id} created!`,
            data: newQuestion,
            error: false,
          });
        } catch (error) {
          return res.status(500).json({
            message: error,
            data: undefined,
            error: true,
          });
        }
      };


  const QuestionsController = {
    updateQuestion,
    getQuestionById,
    deleteQuestion,
    createQuestion,
    getAllQuestions,
    //getClassByTrainer,
  };

  export default QuestionsController;