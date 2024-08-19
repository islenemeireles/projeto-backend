const Image = require('../models/image');

exports.createImage = async (req, res) => {
  try {
    const image = await Image.create(req.body);
    res.status(201).json(image);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.findAll();
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getImageById = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    if (image) {
      res.status(200).json(image);
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    if (image) {
      await image.update(req.body);
      res.status(200).json(image);
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    if (image) {
      await image.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
