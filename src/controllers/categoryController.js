const Category = require('../models/category');

exports.getCategories = async (req, res) => {
  try {
    const { limit = 12, page = 1, fields = 'name,slug', use_in_menu } = req.query;
    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    if (isNaN(parsedLimit) || isNaN(parsedPage)) {
      return res.status(400).json({ error: 'Invalid limit or page query parameter' });
    }

    const where = {};
    if (use_in_menu) {
      where.use_in_menu = use_in_menu === 'true';
    }

    const total = await Category.count({ where });

    const categories = await Category.findAll({
      where,
      limit: parsedLimit === -1 ? undefined : parsedLimit,
      offset: parsedLimit === -1 ? 0 : (parsedPage - 1) * parsedLimit,
      attributes: fields.split(',')
    });

    res.status(200).json({
      data: categories,
      total,
      limit: parsedLimit,
      page: parsedPage
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id, 10);

    if (isNaN(categoryId)) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    const category = await Category.findByPk(categoryId);

    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, slug, use_in_menu } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ error: 'Name and slug are required' });
    }

    const newCategory = await Category.create({
      name,
      slug,
      use_in_menu: use_in_menu || false
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id, 10);
    const { name, slug, use_in_menu } = req.body;

    if (isNaN(categoryId)) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    if (!name || !slug) {
      return res.status(400).json({ error: 'Name and slug are required' });
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.update({
      name,
      slug,
      use_in_menu: use_in_menu || false
    });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id, 10);

    if (isNaN(categoryId)) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
