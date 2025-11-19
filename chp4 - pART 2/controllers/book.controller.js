const e = require('express');
const { Books } = require('../models/book');


exports.getAllBooks = (req, res) => {
      
  res.setHeader('x-piy', 'ahmad');
    res.json(Books);
  
}

exports.getBookById = (req, res) => {
 const bookId = parseInt(req.params.id);
  if(!isNaN(bookId)=== false){
    return res.status(400).json({message: 'Invalid book ID', error: 'Bad Request'});
  }



    const book = Books.find(b => b.id === bookId); //SELECT * FROM books WHERE id = {bookId}

    if(!book) {
        return res.status(404).json({message: 'Book not found' , error: 'Not Found'});
    }

    res.json(book);
}





exports.createBook = (req, res) => {




const { title, author } = req.body;
if(!title || !author){
    return res.status(400).json({message: 'Title and author are required', error: 'Bad Request'});
}
else{
    const newBook = {
        id: Books.length + 1,
        title,
        author
    };
    Books.push(newBook);
    return res.status(201).json({message: 'Book created successfully', book: newBook});
}


    // In a real application, you would get the book data from req.body
    console.log('Creating a new book...' , req.body);

    res.status(201).json({message: 'Book created successfully'});
}



exports.updateBook = (req, res) => {
    // Implementation for updating a book


// put update book

    const bookId = parseInt(req.params.id);
    if(!isNaN(bookId)=== false){
        return res.status(400).json({message: 'Invalid book ID', error: 'Bad Request'});
    } 
    const { title, author } = req.body;
    const bookIndex = Books.findIndex(b => b.id === bookId);
    if(bookIndex === -1){
        return res.status(404).json({message: 'Book not found', error: 'Not Found'});
    }
    Books[bookIndex] = { id: bookId, title, author };
    res.json({message: 'Book updated successfully', book: Books[bookIndex]});



}


exports.deleteBook = (req, res) => {
    // Implementation for deleting a book


// delete book

    const bookId = parseInt(req.params.id);
    if(!isNaN(bookId)=== false){
        return res.status(400).json({message: 'Invalid book ID', error: 'Bad Request'});
    }
    const bookIndex = Books.findIndex(b => b.id === bookId);
    if(bookIndex === -1){
        return res.status(404).json({message: 'Book not found', error: 'Not Found'});
    }
    Books.splice(bookIndex, 1);
    res.json({message: 'Book deleted successfully'});



}