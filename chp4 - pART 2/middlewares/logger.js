const fs = require('node:fs');
exports.loggerMiddleware =((req,res,next)=>{
    console.log(``);
    fs.appendFileSync('requests.log', `${new Date().toISOString()} - ${req.method} ${req.url} ${req.path}  \n ${JSON.stringify(req.body)} \n ${Date.now()}`);  
    next();
});