import { Filter } from 'bad-words';
import constants from '../../shared/constants.ts';
import * as socketio from 'socket.io';

const messages: string[] = [];
const filter = new Filter();

const handleMessages = (io: socketio.Server, socket: socketio.Socket) => {
    socket.emit(constants.messagesUpdated, messages);
    socket.on(constants.newMessage, (message, callback) => {
        if (filter.isProfane(message)) {
            callback('profanity is not allowed');
            socket.emit('newNotification', 'Message not delivered.\nProfanity is not allowed.');
            return;
        }
        messages.push(message);
        io.emit(constants.messagesUpdated, messages);
        callback();
    });
};

export default handleMessages;