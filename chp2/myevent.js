const EventEmitter = require('events');



const eventEmitter = new EventEmitter();


eventEmitter.on('greet', (name) => {
    console.log(`Hello wc to event in js, ${name}!`);
});


eventEmitter.once('pushnotify', () => {
    console.log(`This will be logged only once for .`);
});


eventEmitter.emit('greet', 'Alice');
eventEmitter.emit('greet', 'Bob');
eventEmitter.emit('greet', 'Charlie');
eventEmitter.emit('pushnotify');
eventEmitter.emit('pushnotify');
eventEmitter.emit('greet', 'Charlie22');