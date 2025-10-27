import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import handleChatIO from './utils/handleChatIO.ts';
import handleDB from './utils/handleDB.ts';
import hbs from 'hbs';
import http from 'http';
import path from 'path';

// constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 3000;
const viewsPath = path.resolve(__dirname, '../ui/templates/views');
const partialsPath = path.resolve(__dirname, '../ui/templates/partials');

// app setup
const app = express();
const server = http.createServer(app);

// Handlebars setup
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// public directory setup
const publicPath = path.resolve(__dirname, '../ui/dist');

app.use(express.static(publicPath));

// setup endpoints
app.get('/chat', (req, res) => {
    res.render('chat', {
        mainHeading: 'Chat App',
        messageForm: {
            inputPlaceholder: 'Message',
            buttonText: 'Send Message',
        },
        messagesHeading: 'Messages',
        notifitionsHeading: 'Notifications'
    });
});

app.get('', (req, res) => {
    res.render('index', {
        mainHeading: 'Chat App',
        messageForm: {
            inputPlaceholder: 'Message',
            buttonText: 'Send Message',
        },
        messagesHeading: 'Messages',
        notifitionsHeading: 'Notifications'
    });
});

handleChatIO(server);

handleDB.ConnectToDB().then(() => {
    server.listen(port, () => {
        console.log("server running...");
        console.log("http://localhost:" + port);
    });
});