const EventEmitter = require('events');


class ChatRoom extends EventEmitter {
    constructor() {
        super();
        this.users = new Set();
    }
    join(user) {
        this.users.add(user);
        this.emit('userJoined', user);
    }
    sendMessage(user, message) {
        if (this.users.has(user)) {
            this.emit('message', { user, message });
        } else {
            this.emit('error', new Error(`${user} is not in the chat room.`));
        }
    }
       leave(user){
        if (this.users.has(user)) {
            this.users.delete(user);
            this.emit('userLeft', user);
        } else {
            this.emit('error', new Error(`${user} is not in the chat room.`));
       }

    }

    }


module.exports = ChatRoom;
