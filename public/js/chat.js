import handleMessages from '../js/messages.js';
import handleNotifications from './notifications.js';
import handleMessageForm from './messageForm.js';

const socket = io();

// messages form
handleMessageForm(socket);

// messages
handleMessages(socket);

// notifications
handleNotifications(socket);