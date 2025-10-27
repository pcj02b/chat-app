import { Socket } from "socket.io-client";
import utils from './utils.js';
import Constants from '../../shared/constants.js';

const $messageList = document.getElementById('MessageList');

const handleMessagesUpdated = (messages: string[]) => {
    if ($messageList) {
        const messageElements = messages.map(utils.createListItem);
        $messageList.replaceChildren(...messageElements);
    }
};

const handleMessages = (socket: Socket) => {
    socket.on(Constants.messagesUpdated, handleMessagesUpdated);
};

export default handleMessages;