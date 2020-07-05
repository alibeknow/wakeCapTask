const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');
const { addController } = require('../controllers/asset');
const { assetsValidator } = require('../validator/index');

const router = express.Router();

router.post('/', requestValidator(assetsValidator), addController);

module.exports = router;
