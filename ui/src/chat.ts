import { io } from "socket.io-client";

import handleMessages from './messages.ts';
import handleNotifications from './notifications.ts';
import handleMessageForm from './messageForm.ts';

const socket = io();

// messages form
handleMessageForm(socket);

// messages
handleMessages(socket);

// notifications
handleNotifications(socket);
