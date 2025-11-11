const ChatRoom = require('./chatroom');

const chat = new ChatRoom();
chat.on('userJoined', (user) => {
    console.log(`${user} has joined the chat.`);
});
chat.on('message', ({ user, message }) => {
    console.log(`${user}: ${message}`);
});
chat.on('userLeft', (user) => {
    console.log(`${user} has left the chat.`);
});
chat.on('error', (err) => {
    console.error(`Error: ${err.message}`);
});


// simulating chat room activity

chat.join('Alice');
chat.sendMessage('Alice', 'Hello everyone!');
chat.join('Bob');
chat.sendMessage('Bob', 'Hi Alice!');
chat.leave('Alice');
chat.sendMessage('Alice', 'Goodbye!'); // This will trigger an error event