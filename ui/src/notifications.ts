import utils from './utils.js';
import Constants from '../../shared/constants.js';
import type { Socket } from 'socket.io-client';

const $notificationList = document.getElementById('NotificationList');
let notifications: string[] = [];
const maxNotifications = 5;

const handleNotifications = (socket: Socket) => {
    if ($notificationList) {
        const handleNewNotification = (notification: string) => {
            if (notifications.length >= maxNotifications)
                notifications.shift();
            notifications.push(notification);
            const notificationElements = notifications.map(utils.createListItem);
            $notificationList.replaceChildren(...notificationElements);
        };
        socket.on(Constants.newNotification, handleNewNotification);
    }
};

export default handleNotifications;