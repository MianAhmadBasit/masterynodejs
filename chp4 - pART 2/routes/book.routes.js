const express = require('express');
const controllers = require('../controllers/book.controller');
const router = express.Router();


// we are with smartplay /books write & homgenous type short api

// get all books
router.get('/', controllers.getAllBooks);

// daynamic parameter by id
router.get('/:id', controllers.getBookById);


// post add new book

router.post('/', controllers.createBook);

// put update book


router.put('/:id', controllers.updateBook);

// delete book
router.delete('/:id', controllers.deleteBook);


module.exports = router;