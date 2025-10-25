import utils from '../js/utils.js';
import constants from '../shared/constants.js';

const $notificationList = document.getElementById('NotificationList');
const notifications = [];
const maxNotifications = 5;

const handleNotifications = (socket) => {
    const handleNewNotification = (notification) => {
        if (notifications.length >= maxNotifications)
            notifications.shift();
        notifications.push(notification);
        const notificationElements = notifications.map(utils.createListItem);
        $notificationList.replaceChildren(...notificationElements);
    };
    socket.on(constants.newNotification, handleNewNotification);
};

export default handleNotifications;