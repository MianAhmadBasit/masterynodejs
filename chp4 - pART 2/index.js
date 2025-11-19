const express = require('express');
const app = express();
const port = 8000;
const { loggerMiddleware } = require('./middlewares/logger');

const bookRoutes = require('./routes/book.routes');



// Middleware to parse JSON bodies /(plugin)
app.use(express.json());
app.use(loggerMiddleware)


// app.use((req,res,next)=>{
//     console.log('Request URL: ' + req.url);
//     res.json({message: 'Middleware executed'});
//     next();
// });






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
app.use('/books', bookRoutes);










app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});