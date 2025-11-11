const EventEmitter = require('events');

class Chat extends EventEmitter {
    sendMessage(message) {
        console.log(`Sending message: ${message}`);
        this.emit('message sent', message);
    }
}
const chat= new Chat()
chat.on('message recived', (msg) => {
    console.log(`Message "${msg}" has been sent successfully!`);
});

chat.sendMessage('Hello, this is a test message!');