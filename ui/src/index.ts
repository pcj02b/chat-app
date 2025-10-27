const signInForm = document.getElementById('JoinForm');

if (signInForm) {
    // const displayNameInput = signInForm.querySelector('[name="displayName"]]')
    // const roomInput = signInForm.querySelector('[name="room"]]')

    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });
}
