import constants from '../shared/constants.js';

const $messageForm = document.getElementById('MessageForm');
const $messageFormInput = $messageForm.querySelector('[name="message"]');

const handleMessageForm = (socket) => {
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
};

export default handleMessageForm;