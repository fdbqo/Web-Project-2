

document.addEventListener('DOMContentLoaded', function () {
    console.log('page loaded');
    console.log(localStorage.getItem('LastActivity'));
    const lastActivity = localStorage.getItem('LastActivity');
    const sessionTimeout = 30 * 1000; // 30 seconds inactivity timer

    if (lastActivity && Date.now() - lastActivity > sessionTimeout) {
        localStorage.removeItem('LoggedIn');
        localStorage.removeItem('LoggedInUsername');
        console.log(sessionTimeout)
    }

    updateDisplay();

});



// Initialize users from localStorage or an empty array
let users = JSON.parse(localStorage.getItem('users')) || [];

// Default admin user
const defaultAdminUser = { username: 'admin', password: 'admin' };

console.log(users);

// Add default admin user if it doesn't exist
if (!userExists(defaultAdminUser.username)) {
    addUser(defaultAdminUser);
}

// Event listener for user modal
document.getElementById('userButton').addEventListener('click', function () {
    const myModal = new bootstrap.Modal(document.getElementById('userModal'));
    myModal.show();
});

// Check if a user exists
function userExists(username) {
    return users.some(user => user.username === username);
}

// Add a new user
function addUser(user) {
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Sign up function
function SignUp(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    if (!username || !password) {
        displayError('Username and password are required');
    } else if (userExists(username)) {
        displayError('Username already exists');
    } else if (email && users.some(user => user.email === email)) {
        displayError('Email already registered');
    } else {
        const newUser = { username, password, email };
        addUser(newUser);
        window.showImportantToast('Sign up finished!', true);
        document.getElementById('userForm').reset();
    }
}

// Log in function
function LogIn(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        displayError('Username and password are required');
    } else if (users.some(user => user.username === username && user.password === password)) {
        localStorage.setItem('LoggedIn', 'true');
        localStorage.setItem('LoggedInUsername', username);
        window.showImportantToast('Log in finished!', true);
        updateDisplay();
    } else {
        displayError('Username or password are incorrect');
    }
}

// Display error message
function displayError(message) {
    document.getElementById('userError').innerText = message;
    document.getElementById('userError').style.color = 'red'; 
}

window.resetUsers = function () {

    users = [];
    localStorage.clear();
    addUser(defaultAdminUser);
}

function updateDisplay() {
    const username = localStorage.getItem('LoggedInUsername');
    const isLoggedIn = localStorage.getItem('LoggedIn') === 'true';

    const displayElement = document.getElementById('userButton');

    if (isLoggedIn) {
        displayElement.innerText = `User (${username}), Logged in!`;
    }
    else {
        displayElement.innerText = 'User, Not logged in!';
    }
}

updateDisplay();

function updateLastActivity() {
    localStorage.setItem('LastActivity', Date.now());
    console.log('last activity updated')
}

window.addEventListener('mousemove', updateLastActivity);
window.addEventListener('click', updateLastActivity);
window.addEventListener('scroll', updateLastActivity);
window.addEventListener('keypress', updateLastActivity);

const checkoutButton = document.getElementById('checkoutButtonID');

if (checkoutButton) {
    checkoutButton.addEventListener('click', function (event) {
        if (!localStorage.getItem('LoggedIn')) {
            event.preventDefault();
            window.showImportantToast('Please log in first!', false);
        }
    });


}


