import { User } from "../models/User.js";
import { Product } from "../models/Product.js";

export const getUsers = async(req, res) => {
  try {
    const Users = await User.findAll({
      atributes: ["id", "username", "gmail"],
    });
    res.json(Users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


export const createUser = async (req, res) => {
  const { username, gmail } = req.body;
  try {
    let newUser = await User.create(
      {
        username,
        gmail,
      },
      {
        fields: ["username", "gmail"],
      }
    );
    return res.json(newUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  res.json("received");
}

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) return res.status(404).json({message: "user does not exist"})
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    const { gmail} = req.body;

    const user = await User.findByPk(id);
    user.username = username;
    user.gmail = gmail;
    await user.save();

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.destroy({
      where: {
        userId: id,
      },
    });
    await User.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export const getUserProducts = async(req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findAll({
      where: { userId: id },
    });
    res.json(product);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
