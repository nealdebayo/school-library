const router = require('express').Router();

const controller = require('../controllers/institution.controller');

module.exports = router;

router.get('/', controller.getBooks);
router.post('/', controller.addBook);
router.put('/:institutionId', controller.changeBook);
router.delete('/:institutionId', controller.removeBook);
router.get('/:institutionId', controller.getBook);
