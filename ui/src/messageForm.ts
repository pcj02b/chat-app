import { Socket } from "socket.io-client";
import Constants from '../../shared/constants.js';
import type { Message } from "../../shared/message.js";

const $messageForm = document.getElementById('MessageForm');
const $messageFormInput : HTMLInputElement | null | undefined = $messageForm?.querySelector('[name="message"]');

const handleMessageForm = (socket: Socket) => {

    if (!$messageForm) return;

    const handleMessageFromSubmit = (e: Event) => {
        e.preventDefault();
        if (!$messageFormInput) return;
        $messageForm.setAttribute('disabled', 'disabled');
        if (!$messageFormInput.value) return;
        socket.emit(Constants.newMessage, {Username: null, Room: null, Text: $messageFormInput.value } as Message,
            (error: string) => {
                $messageForm.removeAttribute('disabled');
                $messageFormInput.value = '';
                $messageFormInput.focus();
                if (error) {
                    console.log(error);
                }
            })
    };
    $messageForm.addEventListener('submit', handleMessageFromSubmit);
};

export default handleMessageForm;