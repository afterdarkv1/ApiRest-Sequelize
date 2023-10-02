
import { Brand } from "../models/Brand.js";
import { Product } from "../models/Product.js";

export const getBrands = async(req, res) => {
  try {
    const Brands = await Brand.findAll({
      attributes: ["id", "name"],
    });
    res.json(Brands);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const createBrand = async (req, res) => {
  const { name } = req.body;
  try {
    let newBrand = await Brand.create(
      {
        name,
      },
      {
        fields: ["name"],
      }
    );
    return res.json(newBrand);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  res.json("received");
}

export const getBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findOne({
      where: {
        id,
      },
    });
    if (!brand) return res.status(404).json({message: "brand does not exist"})
    res.json(brand);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const brand = await Brand.findByPk(id);
    brand.name = name;
    await brand.save();

    res.json(brand);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.destroy({
      where: {
        brandId: id,
      },
    });
    await Brand.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export const getBrandProducts = async(req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findAll({
      where: { brandId: id },
    });
    res.json(product);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
