let email = document.getElementById('emailReg');
let username = document.getElementById('userReg');
let password = document.getElementById('passwordReg');
let firstName = document.getElementById('fnameReg');
let lastName = document.getElementById('lnameReg');
let age = document.getElementById('ageReg');
let btnReg = document.getElementById('register');

let emailError = document.getElementById('emailRegisterError');
let usernameError = document.getElementById('userRegisterError');
let passError = document.getElementById('passwordRegError');
let fnameError = document.getElementById('fnameRegisterError');
let lnameError = document.getElementById('lnameRegisterError');
let ageError = document.getElementById('ageRegisterError');

let users;
if(localStorage.users === undefined){
    users = [];
} else {
    users = JSON.parse(localStorage.getItem('users'));
};

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

btnReg.addEventListener('click', function(e){
    e.preventDefault();
    let userObject = new Object();

    // Email conditions
    let emailArr1;
    let emailArr2;
    if(email.value.includes('@') && email.value.includes('.')){
        emailArr1 = email.value.split('@');
        emailArr2 = emailArr1[1].split('.');
    }
    if(email.value.includes('@') && email.value.includes('.') &&
    emailArr1[0].length > 0 && emailArr2[0].length > 0 &&
    emailArr2[1].length > 1){
        userObject.email = email.value;
        emailError.innerHTML = '<i class="fa-solid fa-check"></i>';
        emailError.style.color = 'green'
    } else {
        emailError.innerHTML = 'Invalid email address';
        emailError.style.color = 'red';
        return;
    }

    // Username conditions
    let specialChar = specialCharacters.filter(element => username.value.includes(element))
    let letterContent = letters.filter(element => username.value.includes(element));
    let figureContent = figures.filter(element => username.value.includes(element));
    if(username.value.length >= 6 && specialChar.length > 0 && letterContent.length > 0 &&
        figureContent.length > 0){
            userObject.username = username.value.toLowerCase();
            usernameError.innerHTML = '<i class="fa-solid fa-check"></i>';
            usernameError.style.color = 'green';
        } else{
            usernameError.innerHTML = 'Username must contain letters, figures and a special character';
            usernameError.style.color = 'red';
            return;
        };
    
    // Password conditions
    if(password.value.length >= 6){
        userObject.password = password.value;
        passError.innerHTML = '<i class="fa-solid fa-check"></i>';
        passError.style.color = 'green';
    } else {
        passError.innerHTML = 'Password must contain 6 characters at least';
        passError.style.color = 'red';
        return;
    }

    // First Name conditions
    let fnameContent = letters.filter(element => firstName.value.includes(element));
    if(fnameContent.length >=2){
        userObject.firstName = firstName.value;
        fnameError.innerHTML = '<i class="fa-solid fa-check"></i>';
        fnameError.style.color = 'green';
    } else {
        fnameError.innerHTML = 'First Name must contain 2 letters at least';
        fnameError.style.color = 'red';
    }

    // Last Name conditions
    let lnameContent = letters.filter(element => lastName.value.includes(element));
    if(lnameContent.length >=2){
        userObject.lastName = lastName.value;
        lnameError.innerHTML = '<i class="fa-solid fa-check"></i>';
        lnameError.style.color = 'green';
    } else {
        lnameError.innerHTML = 'Last Name must contain 2 letters at least';
        lnameError.style.color = 'red';
        return;
    }

    // Age conditions
    if(age.value >= 18 && age.value <= 65){
        userObject.age = age.value;
        ageError.innerHTML = '<i class="fa-solid fa-check"></i>';
        ageError.style.color = 'green';
    } else {
        ageError.innerHTML = 'Age must be between 18 and 65';
        ageError.style.color = 'red';
        return;
    }

    users.push(userObject);
    localStorage.setItem('users', JSON.stringify(users));
    window.location = 'login.html';
})

// The end