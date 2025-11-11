const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('errorEvent', (err) => {
    console.error(`An error occurred: ${err.message}`);
});

// Simulating an error event
eventEmitter.emit('errorEvent', new Error('Something went wrong!'));
eventEmitter.emit('errorEvent', new Error('Another error occurred!'));
// good way of handling errors in event-driven architecture