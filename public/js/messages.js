import utils from '../js/utils.js';
import constants from '../shared/constants.js';

const $messageList = document.getElementById('MessageList');

const handleMessagesUpdated = (messages) => {
    const messageElements = messages.map(utils.createListItem);
    $messageList.replaceChildren(...messageElements);
};

const handleMessages = (socket) => {
    socket.on(constants.messagesUpdated, handleMessagesUpdated);
};

export default handleMessages;