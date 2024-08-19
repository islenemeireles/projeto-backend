const ProductCategory = require('../models/productCategory');

//criar uma nova associação entre produto e categoria
exports.createProductCategory = async (req, res) => {
  try {
    const productCategory = await ProductCategory.create(req.body);
    res.status(201).json(productCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//listar todas as associações entre produtos e categorias
exports.getProductCategories = async (req, res) => {
  try {
    const productCategories = await ProductCategory.findAll();
    res.status(200).json(productCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//obter uma associação específica pelo ID
exports.getProductCategoryById = async (req, res) => {
  try {
    const { product_id, category_id } = req.params;
    const productCategory = await ProductCategory.findOne({
      where: {
        product_id,
        category_id
      }
    });
    if (productCategory) {
      res.status(200).json(productCategory);
    } else {
      res.status(404).json({ error: 'Associação não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//deletar uma associação entre produto e categoria
exports.deleteProductCategory = async (req, res) => {
  try {
    const { product_id, category_id } = req.params;
    const productCategory = await ProductCategory.findOne({
      where: {
        product_id,
        category_id
      }
    });
    if (productCategory) {
      await productCategory.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Associação não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
