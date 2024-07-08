const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const validate = require('../middlewares/validationMiddleware');
const { authorSchema } = require('../schemas/authorSchema');
const { errorHandle } = require('../middlewares/errorMiddleware');

router.post('/', validate(authorSchema), errorHandle(authorController.createAuthor));
router.get('/', errorHandle(authorController.getAllAuthors));
router.get('/paginated', errorHandle(authorController.getAuthorsPaginated));
router.get('/search', errorHandle(authorController.searchAuthors));
router.get('/:id', errorHandle(authorController.getAuthorById));
router.patch('/:id', validate(authorSchema), errorHandle(authorController.updateAuthor));
router.delete('/:id', errorHandle(authorController.deleteAuthor));

module.exports = router;
