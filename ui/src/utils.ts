import type { Message } from "../../shared/message";

// utils
const createMessageItem = (message: Message) => {
    let element = document.createElement('li')
    console.log('creating message item', message)
    element.innerHTML = message.Text;
    return (element);
};

const createNotificationItem = (notification: string) => {
    let element = document.createElement('li')
    element.innerHTML = notification;
    return (element);
};

const utils = {
    createMessageItem,
    createNotificationItem
}

export default utils; 