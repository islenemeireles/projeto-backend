const Product = require('../models/product');
const Image = require('../models/image');
const Option = require('../models/option');

exports.getProducts = async (req, res) => {
  try {
    const {
      limit = 12,
      page = 1,
      fields = 'name,images,price',
      match = '',
      category_ids = '',
      'price-range': priceRange = '',
      ...options
    } = req.query;

    //validação de parâmetros
    if (isNaN(limit) || limit < -1) return res.status(400).json({ error: 'Invalid limit parameter' });
    if (isNaN(page) || page < 1) return res.status(400).json({ error: 'Invalid page parameter' });

    //filtros de busca
    let filteredProducts = await Product.findAll({
      include: [
        { model: Image, as: 'images' }, //ajustar alias conforme modelo
        { model: Option, as: 'options' } //ajustar alias conforme modelo
      ]
    });

    //filtragem de nome/descrição
    if (match) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.includes(match) || product.description.includes(match)
      );
    }

    //filtragem por categorias
    if (category_ids) {
      const categoryIds = category_ids.split(',').map(Number);
      filteredProducts = filteredProducts.filter(product =>
        product.category_ids.some(id => categoryIds.includes(id))
      );
    }

    //filtragem por faixa de preço
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
      );
    }

    //paginação
    const total = filteredProducts.length;
    if (limit !== -1) {
      const start = (page - 1) * limit;
      const end = start + limit;
      filteredProducts = filteredProducts.slice(start, end);
    }

    //resposta
    res.status(200).json({
      data: filteredProducts,
      total,
      limit: parseInt(limit, 10),
      page: parseInt(page, 10)
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad request' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [
        { model: Image, as: 'images' }, //ajustar alias conforme model
        { model: Option, as: 'options' } //ajustar alias conforme model
      ]
    });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options } = req.body;

    //validação de campos obrigatórios
    if (!name || !slug || typeof stock !== 'number' || !description || typeof price !== 'number') {
      return res.status(400).json({ error: 'Invalid request data: missing required fields' });
    }

    //validação de category_ids
    if (category_ids && !Array.isArray(category_ids)) {
      return res.status(400).json({ error: 'Invalid category_ids format' });
    }

    //validação de imagens
    if (images && !Array.isArray(images)) {
      return res.status(400).json({ error: 'Invalid images format' });
    }

    //validação de opções
    if (options && !Array.isArray(options)) {
      return res.status(400).json({ error: 'Invalid options format' });
    }

    const newProduct = await Product.create({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount
    });

    //associar categorias
    if (category_ids) {
      await newProduct.setCategories(category_ids); //exemplo usando método setCategories
    }

    //adicionar imagens
    if (images && images.length) {
      await Promise.all(images.map(img =>
        Image.create({ ...img, productId: newProduct.id })
      ));
    }

    //adicionar opções
    if (options && options.length) {
      await Promise.all(options.map(opt =>
        Option.create({ ...opt, productId: newProduct.id })
      ));
    }

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad request' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    //atualizar o produto
    await product.update({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount
    });

    //atualizar categorias
    if (category_ids) {
      await product.setCategories(category_ids); //exemplo usando método setCategories
    }

    //atualizar imagens
    if (images) {
      const imageDeletes = images.filter(img => img.deleted).map(img => img.id);
      if (imageDeletes.length) {
        await Image.destroy({ where: { id: imageDeletes } });
      }

      await Promise.all(images.map(img => {
        if (img.deleted) return;
        if (img.id) {
          return Image.update({ content: img.content }, { where: { id: img.id } });
        } else {
          return Image.create({ ...img, productId: id });
        }
      }));
    }

    //atualizar opções
    if (options) {
      const optionDeletes = options.filter(opt => opt.deleted).map(opt => opt.id);
      if (optionDeletes.length) {
        await Option.destroy({ where: { id: optionDeletes } });
      }

      await Promise.all(options.map(opt => {
        if (opt.deleted) return;
        if (opt.id) {
          return Option.update({ ...opt }, { where: { id: opt.id } });
        } else {
          return Option.create({ ...opt, productId: id });
        }
      }));
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad request' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await Product.destroy({ where: { id } });
    await Image.destroy({ where: { productId: id } });
    await Option.destroy({ where: { productId: id } });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
