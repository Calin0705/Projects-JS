let username = document.getElementById('userSignIn');
let password = document.getElementById('passwordSignIn');
let btnLogin = document.getElementById('login');
let btnReset = document.getElementById('reset');
let loginForm = document.getElementById('loginForm');
let resetForm = document.getElementById('resetForm');
let passReset = document.getElementById('resetpass');
let userReset = document.getElementById('userReset');

let userError = document.getElementById('userSignInError');
let passError = document.getElementById('passwordSignInError');
let loginError = document.getElementById('loginError');
let resetError = document.getElementById('resetError');

let users = JSON.parse(localStorage.getItem('users'));

// Username Conditions - username must contain letters, figures and a special character at least and its length bigger than 6
let specialCharacters = ['!', '#', '$', '%', '&', '@', '/', '*', '+', '-'];
let letters = [];
for(let i = 97; i < 123; i++){
    let letter = String.fromCharCode(i);
    letters.push(letter);
}
let figures = [];
for(let i = 48; i <= 57 ; i++){
    let figure = String.fromCharCode(i);
    figures.push(figure);
}
username.addEventListener('keyup', function (){
    let specialChar = specialCharacters.filter(element => username.value.includes(element))
    let letterContent = letters.filter(element => username.value.includes(element));
    let figureContent = figures.filter(element => username.value.includes(element));
    if(username.value.length >= 6 && specialChar.length > 0 && letterContent.length > 0 &&
        figureContent.length > 0){
            userError.innerHTML = '<i class="fa-solid fa-check"></i>';
            userError.style.color = 'green';
        } else{
            userError.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            userError.style.color = 'red';
        }
})

// Password conditions
password.addEventListener('keyup', function(){
    if(password.value.length >= 6){
        passError.innerHTML = '<i class="fa-solid fa-check"></i>';
        passError.style.color = 'green';
    } else {
        passError.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        passError.style.color = 'red';
    }
})
// Login
btnLogin.addEventListener('click', function(e){
    e.preventDefault();
    let userLogin = new Object();
    let user = users.find(element => element.username === username.value.toLowerCase());
    if(user === undefined || user.password !== password.value){
        loginError.style.display = 'flex';
    } else {
        userLogin.username = username.value.toLowerCase();
        userLogin.password = password.value;
        loginError.style.display = 'none';
        localStorage.setItem('userLogin', JSON.stringify(userLogin));
        window.location = 'home.html';
    }
});

// Display Reset Password form
btnReset.addEventListener('click', function(e){
    e.preventDefault();
    loginForm.style.display = 'none';
    resetForm.style.display = 'flex';

})

// Reset password
passReset.addEventListener('click', function(e){
    e.preventDefault();
    let user = users.find(element => element.username === userReset.value.toLowerCase());
    if(user === undefined){
        resetError.innerHTML = 'Invalid Username!';
        resetError.style.color = 'red';
    } else {
        users.splice(users.indexOf(user), 1);
        localStorage.setItem('users', JSON.stringify(users));
        window.location = 'register.html';
    }
})

// The end




