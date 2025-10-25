import * as socketio from 'socket.io';
import constants from '../../public/shared/constants.js';
import handleMessages from "./handleMessages.js";

const handleChatIO = (server) => {
    const io = new socketio.Server(server);
    io.on('connection', (socket) => {
        socket.emit(constants.newNotification, 'Welcome!');

        socket.broadcast.emit(constants.newNotification, 'New user has joined')

        handleMessages(io, socket);

        socket.on('disconnect', () => {
            io.emit(constants.newNotification, 'User has left')
        });
    });
};

export default handleChatIO;