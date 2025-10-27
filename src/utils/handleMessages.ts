import { Filter } from 'bad-words';
import constants from '../../shared/constants.ts';
import * as socketio from 'socket.io';
import type { Message } from '../../shared/message.ts';
import HandleDB from './handleDB.ts';

const messages: Message[] = [];
const filter = new Filter();

const handleNewMessage = async (message: Message) => {
    await HandleDB.AddMessageToDB(message);
    messages.push(message);
};

const handleMessages = (io: socketio.Server, socket: socketio.Socket) => {
    HandleDB.GetMessages((result) => {
        socket.emit(constants.messagesUpdated, result);
    });
    socket.on(constants.newMessage, (message: Message, callback) => {
        if (filter.isProfane(message.Text)) {
            callback('profanity is not allowed');
            socket.emit('newNotification', 'Message not delivered.\nProfanity is not allowed.');
            return;
        }
        handleNewMessage(message).then(() => {
            io.emit(constants.messagesUpdated, messages);
            callback();
        });
    });
};

export default handleMessages;