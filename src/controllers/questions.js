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

      const updateQuestion = async (req, res) => {
      const { id } = req.params;
      const { comment, bid, user } = req.body;

      const newComment = comment.trim();
      const newBid = bid.trim();
      const newUser = user.trim();
          if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
              message: 'ID invalid',
              data: undefined,
              error: true
            });
          }
          try {
            const currentQuestion = await Questions.findById(id);
            if (!currentQuestion) {
              return res.status(404).json({
                message: `Question with id: ${id} was not found`,
                data: undefined,
                error: true
              });
            }
            const questionProps = Object.keys(currentQuestion.toObject()).slice(1, -1);
            let changes = false;
            questionProps.forEach((prop) => {
              if (req.body[prop] && req.body[prop] !== currentQuestion[prop].toString()) {
                changes = true;
              }
            });

            if (!changes) {
              return res.status(400).json({
                message: 'There were no changes',
                data: currentQuestion,
                error: true
              });
            }

            const questionWithExistentEmail = await Questions.findOne({
              $and: [
                {
                  $or: [{ email }]
                },
                {
                  _id: { $ne: id }
                }
              ]
            });

            if (questionWithExistentEmail) {
              return res.status(400).json({
                message: 'There is another user with that email.',
                data: undefined,
                error: true
              });
            }

            const updateNewQuestion = await Questions.findByIdAndUpdate(
              id,
              {
                newComment,
                newUser,
                newBid
              },
              { new: true }
            );

            return res.status(200).json({
              message: `Question ${updateNewQuestion.comment} ${updateNewQuestion.user} was updated successfully!`,
              data: updateNewQuestion,
              error: false
            });
          } catch {
            return res.status(500).json({
              message: 'An Error ocurred',
              data: undefined,
              error: true
            });
          }
        };

        const deleteQuestion = async (req, res) => {
        const { id } = req.params;

          if (!mongoose.isValidObjectId(id)) {
              return res.status(400).json({
                message: 'Invalid ID',
                data: undefined,
                error: true
              });
            }

            try {
              const actualQuestion = await Questions.findById(id);

              if (!actualQuestion) {
                return res.status(400).json({
                  message: `The question with the ID: ${id} doesn't exists`,
                  data: undefined,
                  error: true
                });
              }

              const deletedQuestion = await Questions.findByIdAndDelete(id);

              return res.status(200).json({
                message: 'Question deleted successfully!',
                data: deletedQuestion,
                error: false
              });
            } catch (error) {
              return res.status(500).json({
                message: `An error ocurred: ${error}`,
                data: undefined,
                error: true
              });
            }
        };

  const QuestionsController = {
    updateQuestion,
    getQuestionById,
    deleteQuestion,
    createQuestion,
    getAllQuestions,
    //getQuestionByUser o getQuestionByComment,
  };

  export default QuestionsController;