import constants from '../shared/constants.js';

const socket = io();

const maxNotifications = 5;

const $messageList = document.getElementById('MessageList');
const $notificationList = document.getElementById('NotificationList');
const $messageForm = document.getElementById('MessageForm');
const $messageFormInput = $messageForm.querySelector('[name="message"]');

const createListItem = (innerHtml) => {
    let element = document.createElement('li')
    element.innerHTML = innerHtml;
    return (element);
};

const handleMessagesUpdated = (messages) => {
    const messageElements = messages.map(createListItem);
    $messageList.replaceChildren(...messageElements);
};
socket.on(constants.messagesUpdated, handleMessagesUpdated);

const notifications = [];
const handleNewNotification = (notification) => {
    if (notifications.length >= maxNotifications)
        notifications.shift();
    notifications.push(notification);
    const notificationElements = notifications.map(createListItem);
    $notificationList.replaceChildren(...notificationElements);
};
socket.on(constants.newNotification, handleNewNotification);

const handleMessageFromSubmit = (e) => {
    e.preventDefault();
    $messageForm.setAttribute('disabled', 'disabled');
    if (!$messageFormInput.value) return;
    socket.emit(constants.newMessage, $messageFormInput.value,
        (error) => {
            $messageForm.removeAttribute('disabled');
            $messageFormInput.value = '';
            $messageFormInput.focus();
            if (error) {
                console.log(error);
            }
        })
};
$messageForm.addEventListener('submit', handleMessageFromSubmit);