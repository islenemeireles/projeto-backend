const Option = require('../models/option');

exports.createOption = async (req, res) => {
  try {
    const option = await Option.create(req.body);
    res.status(201).json(option);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllOptions = async (req, res) => {
  try {
    const options = await Option.findAll();
    res.status(200).json(options);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOptionById = async (req, res) => {
  try {
    const option = await Option.findByPk(req.params.id);
    if (option) {
      res.status(200).json(option);
    } else {
      res.status(404).json({ error: 'Option not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateOption = async (req, res) => {
  try {
    const option = await Option.findByPk(req.params.id);
    if (option) {
      await option.update(req.body);
      res.status(200).json(option);
    } else {
      res.status(404).json({ error: 'Option not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteOption = async (req, res) => {
  try {
    const option = await Option.findByPk(req.params.id);
    if (option) {
      await option.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Option not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
