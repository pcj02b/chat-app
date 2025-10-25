import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import hbs from 'hbs';
import path from 'path';
import http from 'http';
import * as socketio from 'socket.io';
import { Filter } from 'bad-words';

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

const messages = [];
const filter = new Filter();

io.on('connection', (socket) => {
    socket.emit('newNotification', 'Welcome!');
    socket.emit('messagesUpdated', messages);
    socket.broadcast.emit('newNotification', 'new user has joined')

    socket.on('newMessage', (message, callback) => {
        if (filter.isProfane(message)){
            callback('profanity is not allowed');
            socket.emit('newNotification', 'Message not delivered.\nProfanity is not allowed.');
            return;
        }
        messages.push(message);
        io.emit('messagesUpdated', messages);
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('newNotification', 'user has left')
    });
});

server.listen(port, () => {
    console.log("server running...");
    console.log("http://localhost:" + port);
});