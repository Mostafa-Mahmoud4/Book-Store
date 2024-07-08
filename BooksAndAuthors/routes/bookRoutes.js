const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validate = require('../middlewares/validationMiddleware');
const { bookSchema } = require('../schemas/bookSchema');
const { errorHandle } = require('../middlewares/errorMiddleware');

router.post('/', validate(bookSchema), errorHandle(bookController.createBook));
router.get('/', errorHandle(bookController.getAllBooks));
router.get('/paginated', errorHandle(bookController.getBooksPaginated));
router.get('/search', errorHandle(bookController.searchBooks));
router.get('/:id', errorHandle(bookController.getBookById));
router.patch('/:id', validate(bookSchema), errorHandle(bookController.updateBook));
router.delete('/:id', errorHandle(bookController.deleteBook));

module.exports = router;
