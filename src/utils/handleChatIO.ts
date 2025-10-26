import * as socketio from 'socket.io';
import constants from '../../public/shared/constants.js';
import handleMessages from "./handleMessages.ts";
import http from 'http';

const handleChatIO = (server: http.Server) => {
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