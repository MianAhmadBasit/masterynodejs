const express = require('express');
const app = express();
const port = 8000;
const fs = require('node:fs');

// in Memopry data store
let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
];


// Middleware to parse JSON bodies /(plugin)
app.use(express.json());



// app.use((req,res,next)=>{
//     console.log('Request URL: ' + req.url);
//     res.json({message: 'Middleware executed'});
//     next();
// });

app.use((req,res,next)=>{
    console.log(``);
    fs.appendFileSync('requests.log', `${new Date().toISOString()} - ${req.method} ${req.url} ${req.path}  \n ${JSON.stringify(req.body)} \n ${Date.now()}`);  
    next();
});




app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Custom Middleware for logging
app.use((req,res,next)=>{
    console.log('Request received at ' + new Date().toISOString());
    next();
});




app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});




// Routes
app.get('/books', (req, res) => {
  
  res.setHeader('x-piy', 'ahmad');
    res.json(books);
  
});


// daynamic parameter

app.get('/books/:id', (req,res)=>{
    const bookId = parseInt(req.params.id);
  if(!isNaN(bookId)=== false){
    return res.status(400).json({message: 'Invalid book ID', error: 'Bad Request'});
  }



    const book = books.find(b => b.id === bookId); //SELECT * FROM books WHERE id = {bookId}

    if(!book) {
        return res.status(404).json({message: 'Book not found' , error: 'Not Found'});
    }

    res.json(book);
})



app.post('/books' , (req,res)=>{

const { title, author } = req.body;
if(!title || !author){
    return res.status(400).json({message: 'Title and author are required', error: 'Bad Request'});
}
else{
    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    return res.status(201).json({message: 'Book created successfully', book: newBook});
}


    // In a real application, you would get the book data from req.body
    console.log('Creating a new book...' , req.body);

    res.status(201).json({message: 'Book created successfully'});
});
// put update book
app.put('/books/:id', (req,res)=>{
    const bookId = parseInt(req.params.id);
    if(!isNaN(bookId)=== false){
        return res.status(400).json({message: 'Invalid book ID', error: 'Bad Request'});
    } 
    const { title, author } = req.body;
    const bookIndex = books.findIndex(b => b.id === bookId);
    if(bookIndex === -1){
        return res.status(404).json({message: 'Book not found', error: 'Not Found'});
    }
    books[bookIndex] = { id: bookId, title, author };
    res.json({message: 'Book updated successfully', book: books[bookIndex]});
});

// delete book
app.delete('/books/:id', (req,res)=>{
    const bookId = parseInt(req.params.id);
    if(!isNaN(bookId)=== false){
        return res.status(400).json({message: 'Invalid book ID', error: 'Bad Request'});
    }

    books = books.filter(b => b.id !== bookId);
    res.json({message: 'Book deleted successfully'});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});