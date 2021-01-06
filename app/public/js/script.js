// Nav Toggle
const toggle = document.querySelector('.toggle');
const nav = document.querySelector('.sideNav');
toggle.addEventListener('click', () => {
    toggle.classList.toggle('display');
    nav.classList.toggle('sideNav-visible');
});
//form submit button
const submitButton = document.querySelector('.form > button');

const getCookie = (cname) => {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

if (getCookie('loggedIn')) {
    const logIns = document.querySelectorAll('.login');
    logIns.forEach(logIn => {
        logIn.style.display = 'none'
    })
} else {
    const logOuts = document.querySelectorAll('.logout');
    logOuts.forEach(logOut => {
        logOut.style.display = 'none'
    })
}

const navBarController = (moveIn, moveOut, action1, action2) => {
    hamburgerButton.classList.remove(moveIn);
    closeMenuButton.classList.remove(moveOut);
    hamburgerButton.classList.add(moveOut);
    closeMenuButton.classList.add(moveIn);
    navMenu.classList.remove(action2);
    navMenu.classList.add(action1);
};

if (submitButton) {
    submitButton.addEventListener('click', (event) => {
        const formFields = document.querySelectorAll('.form > input');
        const usernameField = formFields[0];
        const passwordField1 = formFields[1];
        const passwordField2 = formFields[2];

        if (passwordField1.value !== passwordField2.value) {
            formMonitor(event, 'Make sure your passwords match!');
        } else if (passwordField1.value.length < 5) {
            formMonitor(event, 'Make sure your password is more than 4 digits');
        } else if (usernameField.value.includes(' ')) {
            formMonitor(event, 'Username must not contain any white spaces!');
        }
    });
}

const formMonitor = (event, message) => {
    event.preventDefault();2
    const authFailedBanner = document.querySelector('.auth-failed-banner');
    authFailedBanner.firstElementChild.innerHTML =
        'Username must not contain any white spaces!';
    authFailedBanner.classList.add('show-banner');
    authFailedBanner.firstElementChild.innerHTML = message;
    authFailedBanner.classList.add('show-banner');
};