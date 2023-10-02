import { Product } from "../models/Product.js";


export const createProduct =  async (req, res) => {
  try {
    const { title, price, description, brandId, userId } = req.body;
    const newProduct = await Product.create({
     title,
     price,
     description,
     brandId,
     userId,
    });

    res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "title", "price", "description", "brandId", "userId"],
      order: [["id", "DESC"]],
    });
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export  const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
 
    const product = await Product.findOne({
      attributes: [ "id","title","price", "description", "brandId", "userId" ],
      where: { id },
    });

    product.set(req.body);

    await product.save();

    res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const deleteProduct = async(req, res) => {
  const { id } = req.params;
  try {
    await Product.destroy({
      where: { id },
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: { id },
      attributes: ["id", "title",  "price", "description", "brandId","userId"],
    });
    res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
