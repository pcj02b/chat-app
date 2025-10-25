const socket = io();
const messageList = document.getElementById('MessageList');
const notificationList = document.getElementById('NotificationList');

socket.on('messagesUpdated',
    (messages) => {
        updateMessages(messages);
    }
);

socket.on('newNotification', (notification) => {
    let element = document.createElement('li');
    element.innerHTML = notification;
    notificationList.appendChild(element);
});

const messageForm = document.getElementById('MessageForm');
const messageFormInput = messageForm.querySelector('[name="message"]');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageForm.setAttribute('disabled', 'disabled');
    socket.emit('newMessage', messageFormInput.value,
        (error) => {
            messageForm.removeAttribute('disabled');
            messageFormInput.value = '';
            messageFormInput.focus();
            if (error) {
                console.log(error);
            }
        })
});

const updateMessages = (messages) => {
    let messageElements = [];
    messages.forEach((message) => {
        let element = document.createElement('li')
        element.innerHTML = message;
        messageElements.push(element);
    });
    messageList.replaceChildren(...messageElements);
};

