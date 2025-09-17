const express = require('express');
const router = express.Router();
const controller = require('../controllers/concurrentController');

router.get('/', controller.list);
router.get('/create', controller.createForm);
router.post('/create', controller.create);
router.get('/edit/:id', controller.editForm);
router.post('/edit/:id', controller.update);
router.post('/delete/:id', controller.delete);

module.exports = router;