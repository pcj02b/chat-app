import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import hbs from 'hbs';
import path from 'path';
import http from 'http';
import * as socketio from 'socket.io';
import { Filter } from 'bad-words';
import constants from '../public/shared/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);

const port = process.env.PORT || 3000

// Handlebars setup
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Chat App',
    });
});

app.get('/constants', (req, res) => {
    res.send(constants);
});

const messages = [];
const filter = new Filter();

io.on('connection', (socket) => {
    socket.emit(constants.newNotification, 'Welcome!');
    socket.emit(constants.messagesUpdated, messages);
    socket.broadcast.emit(constants.newNotification, 'new user has joined')

    socket.on(constants.newMessage, (message, callback) => {
        if (filter.isProfane(message)){
            callback('profanity is not allowed');
            socket.emit('newNotification', 'Message not delivered.\nProfanity is not allowed.');
            return;
        }
        messages.push(message);
        io.emit(constants.messagesUpdated, messages);
        callback();
    });

    socket.on('disconnect', () => {
        io.emit(constants.newNotification, 'user has left')
    });
});

server.listen(port, () => {
    console.log("server running...");
    console.log("http://localhost:" + port);
});