import { Socket } from "socket.io-client";
import utils from './utils.js';
import Constants from '../../shared/constants.js';
import type { Message } from "../../shared/message";

const $messageList = document.getElementById('MessageList');

const handleMessagesUpdated = (messages: Message[]) => {
    if ($messageList) {
        const messageElements = messages.map(utils.createMessageItem);
        $messageList.replaceChildren(...messageElements);
    }
};

const handleMessages = (socket: Socket) => {
    socket.on(Constants.messagesUpdated, handleMessagesUpdated);
};

export default handleMessages;