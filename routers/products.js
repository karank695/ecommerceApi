const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');
router.post('/create', controllers.create);
router.get('/', controllers.getProducts);
router.delete('/:id', controllers.delete);
router.patch('/:id/update_quantity', controllers.update);
module.exports = router;
