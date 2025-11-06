// Modules

// 1. built in modules
// 2. 3rd party Modules 
// 3 . Custom Module (My own Module)



// File System Module (fs)
const fs = require('fs')

// console.log(fs)

// read the file   //built in module
//  const content = fs.readFileSync('./chp1/notes.txt' , 'utf-8')

//  console.log(content)

// also use appendFilesync
// fs.writeFileSync('copy.txt' , 'i want to crate a file ' , 'utf-8')
// console.log(`create done`)
// fs.mkdirSync('ahmad/xyz/a', {recursive:true})
// fs.rmdirSync('./ahmad')
// fs.unlinkSync('copy.txt')


// concept blocking or non blocking sync vs async
console.log('start')
fs.readFile("./notes.txt" , 'utf-8' ,   (error,data)=> {
    if(error){
        console.log(`err is here` , error)
    }
    else{
        console.log(data) 
    }
})

console.log(`end`)

// event loop & thread pool?