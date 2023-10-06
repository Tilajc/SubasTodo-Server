import Products from "../models/Products";
import Users from "../models/Users";

const getAllProducts = async (req, res) => {
    try {
      const Products = await Products.find.populate('Users');
      if (Products.length === 0) {
        return res.status(404).json({
          message: 'Product not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Product found!',
        data: Products,
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

  const getProductById  = async (req, res) => {
    try {
        const { id } = req.params;
        const idProduct = await Product.findOne({ $and: [{ _id: id }] })
          .populate('User');
        if (!idProduct) {
          return res.status(404).json({
            message: `Product with ID ${id} was not found`,
            data: undefined,
            error: true,
          });
        }
        return res.status(200).json({
          message: `Product with ID ${idProduct.id} was found!`,
          data: idProduct,
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

    const createProducts = async (req, res) => {
        try {
          const {
            Users, name, description, category, price, imageUrl, owner,
          } = req.body;
          const UsersExist = await Users.findById(user);
          if (UsersExist === null) {
            return res.status(404).json({
              message: 'There is no user with that ID',
              data: undefined,
              error: true,
            });
          }
          const existingClass = await Product.findOne({
            name,
            description,
            imageUrl,
            price,
            category,
            owner,
          });
          if (existingClass) {
            return res.status(400).json({
              message: 'Product is already',
              data: undefined,
              error: true,
            });
          }
          const activityExist = await Activity.findById(activity);
          if (activityExist === null) {
            return res.status(404).json({
              message: 'There is no Activity with that ID',
              data: undefined,
              error: true,
            });
          }
          const newProduct = await Product.create({
            name,
            description,
            category,
            price,
            imageUrl,
            owner,
          });
          return res.status(201).json({
            message: `Product with ID ${newProduct.id} created!`,
            data: newProduct,
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


  const ProductsController = {
    updateProducts,
    getProductById,
    deleteProducts,
    createProducts,
    getAllProducts,
    //getClassByTrainer,
  };

  export default ProductsController;