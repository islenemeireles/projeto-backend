const sequelize = require('../config/connection');

require('../models/category');
require('../models/image');
require('../models/option');
require('../models/product');
require('../models/productCategory');
require('../models/user');

sequelize.sync({force: true});