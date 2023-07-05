if(localStorage.users === undefined) window.location = 'login.html';

// Hamburger menu
let btnHAm = document.getElementById('hamMenu');
let menu = document.querySelector('nav')
btnHAm.addEventListener('click', function displayHamMenu(){
    menu.classList.toggle('nav');
})

// Switch display between My Shifts and My Profile
let myProfile = document.getElementById('myProfile');
let myShift = document.getElementById('myShifts');
let profileForm = document.querySelector('.profileForm');
let shiftContainer = document.querySelector('.shiftContainer');
let tableContainer = document.querySelector('.tableContainer');
myProfile.addEventListener('click', function showMyProfile(){
    profileForm.style.display = 'flex';
    shiftContainer.style.display = 'none';
    tableContainer.style.display = 'none'
});
myShift.addEventListener('click', function showMyShift(){
    shiftContainer.style.display = 'flex';
    profileForm.style.display = 'none';
    tableContainer.style.display = 'flex';
});


let users = JSON.parse(localStorage.getItem('users'));
let userLogin = JSON.parse(localStorage.getItem('userLogin'));
let user = users.find(element => element.username === userLogin.username);

// Update Profile 33 - 159
let email = document.getElementById('emailReg');
let username = document.getElementById('userReg');
let password = document.getElementById('passwordReg');
let firstName = document.getElementById('fnameReg');
let lastName = document.getElementById('lnameReg');
let age = document.getElementById('ageReg');
let updateBtn = document.getElementById('update');

// Error paragraphs
let emailError = document.getElementById('emailRegError');
let usernameError = document.getElementById('userRegError');
let passError = document.getElementById('passwordRegError');
let fnameError = document.getElementById('fnameRegError');
let lnameError = document.getElementById('lnameRegError');
let ageError = document.getElementById('ageRegError');

// Fill inputs in Update Profile form
email.value = user.email;
username.value = user.username;
password.value = user.password;
firstName.value = user.firstName;
lastName.value = user.lastName;
age.value = user.age;

// Characters for inputs
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

// Modify profile

updateBtn.addEventListener('click', function(e){
    e.preventDefault();
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
        user.email = email.value;
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
            user.username = username.value.toLowerCase();
            userLogin.username = username.value.toLowerCase();
            usernameError.innerHTML = '<i class="fa-solid fa-check"></i>';
            usernameError.style.color = 'green';
        } else{
            usernameError.innerHTML = 'Username must contain letters, figures and a special character';
            usernameError.style.color = 'red';
            return;
        };

     // Password conditions
     if(password.value.length >= 6){
        user.password = password.value;
        userLogin.password = password.value;
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
        user.firstName = firstName.value;
        fnameError.innerHTML = '<i class="fa-solid fa-check"></i>';
        fnameError.style.color = 'green';
    } else {
        fnameError.innerHTML = 'First Name must contain 2 letters at least';
        fnameError.style.color = 'red';
    }

    // Last Name conditions
    let lnameContent = letters.filter(element => lastName.value.includes(element));
    if(lnameContent.length >=2){
        user.lastName = lastName.value;
        lnameError.innerHTML = '<i class="fa-solid fa-check"></i>';
        lnameError.style.color = 'green';
    } else {
        lnameError.innerHTML = 'Last Name must contain 2 letters at least';
        lnameError.style.color = 'red';
        return;
    }

    // Age conditions
    if(age.value >= 18 && age.value <= 65){
        user.age = age.value;
        ageError.innerHTML = '<i class="fa-solid fa-check"></i>';
        ageError.style.color = 'green';
    } else {
        ageError.innerHTML = 'Age must be between 18 and 65';
        ageError.style.color = 'red';
        return;
    }

    users.splice(users.indexOf(user), 1, user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('userLogin', JSON.stringify(userLogin));
    displayWelcome();
})


// Display Welcome Username
let welcome = document.getElementById('welcome');
function displayWelcome(){
    welcome.innerHTML = `Welcome ${userLogin.username}!`;
}
displayWelcome();


// Add shift
let date = document.getElementById('addDate');
let startTime = document.getElementById('addStartTime');
let endTime = document.getElementById('addEndTime');
let salaryPerHour = document.getElementById('addEarning');
let place = document.getElementById('addShiftPlace');
let slug = document.getElementById('addShiftSlug');
let comment = document.getElementById('addComment');
let btnAddShift = document.getElementById('addShift');

let slugError = document.getElementById('shiftSlugError');

// Add shift function
btnAddShift.addEventListener('click', function addShift(e){
    e.preventDefault();
    if(btnAddShift.textContent === 'Add Shift'){
    // Salary per shift
    let timeStart = new Date(`${date.value} ${startTime.value}`);
    let timeEnd = new Date(`${date.value} ${endTime.value}`);
    let salaryPerShift;
  
    let timeShift = (timeEnd.getHours() + (timeEnd.getMinutes()/60) - (timeStart.getHours() + timeStart.getMinutes()/60));
    if(timeShift > 0){
        salaryPerShift = +(timeShift * (salaryPerHour.value)).toFixed(2);
    } else{salaryPerShift = +(-timeShift * (salaryPerHour.value)).toFixed(2);}

      // UserShifts Array
    if(user.userShifts === undefined){
        user.userShifts = [];
    }

    // UserShift Object
    let userShift = new Object();

    if(date.value !== ''){
        userShift.date = date.value;
    } else {return};
    if(startTime.value !== ''){
        userShift.startTime = startTime.value;
    } else {return};
    if(endTime.value !== ''){
        userShift.endTime = endTime.value;
    } else {return};
    if(salaryPerHour.value !== ''){
        userShift.salaryPerHour = salaryPerHour.value;
    } else {return};
    if(place.value !== ''){
        userShift.place = place.value;
    } else{return}

    // Shift slug conditions - Shift slug must be unique;
    let nameShift = user.userShifts.filter(element => element.shiftSlug === slug.value.toLowerCase());
    if(nameShift.length > 0 || slug.value === ''){
        slugError.innerHTML = 'Invalid Slug!';
        return;
    } else {userShift.shiftSlug = slug.value.toLowerCase();
        slugError.innerHTML = ''
    };

    userShift.salaryPerShift = salaryPerShift;
    userShift.comments = comment.value;
    user.userShifts.push(userShift);
    users.splice(users.indexOf(user), 1, user);
    localStorage.setItem('users', JSON.stringify(users));
    table(shifts); 
    clearInputs();

    window.location.reload();

    } else {
        editShift();
        table(shifts);
    }
 
})

let shifts = user.userShifts;  //Array width shifts 

// Fill out table
let tbody = document.querySelector('tbody');
let avgEarnings = document.getElementById('avgEarnings');
let mostProfitable = document.getElementById('mostProfitable');
let lessProfitable = document.getElementById('lessProfitable');
let total = document.getElementById('total');


function table(array){
    let earningsPerShift = [];
    let row = '';
    if(array !== undefined){
        array.forEach((element, index) => {
            row += 
            `<tr>
                <td>${index+1}</td>
                <td>${element.date}</td>
                <td>${element.startTime}</td>
                <td>${element.endTime}</td>
                <td>${element.salaryPerHour}</td>
                <td>${element.place}</td>
                <td>${element.shiftSlug}</td>
                <td>${element.salaryPerShift}</td>
                <td>${element.comments}</td>
                <td><button id="action" onclick="displayShift(${index})">Edit</button></td>
            </tr>`;
            earningsPerShift.push(element.salaryPerShift);
        });
    } else {return};

    tbody.innerHTML = row;
    // Fill Out tfoot
    let mostProfit = Math.max(...earningsPerShift);
    let lessProfit = Math.min(...earningsPerShift);
    let sum = earningsPerShift.reduce((accumulator, currentValue) => {
        accumulator += currentValue;
        return accumulator;
    }, 0);
    let avg = sum/earningsPerShift.length;
    
    if(earningsPerShift.length > 0){
        mostProfitable.innerHTML = mostProfit;
        lessProfitable.innerHTML = lessProfit;
        total.innerHTML = sum.toFixed(1);
        avgEarnings.innerHTML = avg.toFixed(1);
    } else {
        mostProfitable.innerHTML = '';
        lessProfitable.innerHTML = '';
        total.innerHTML = '';
        avgEarnings.innerHTML = '';
    }

}
table(shifts);

// Search shift by date
let startDate = document.getElementById('searchFromDate');
let endDate = document.getElementById('searchToDate');
let btnSearchDate = document.getElementById('searchDate');


btnSearchDate.addEventListener('click', function(e){
    e.preventDefault();

    let filterShiftByDate = shifts.filter(el => 
        (new Date(el.date)) >= (new Date(startDate.value)) &&
        (new Date(el.date)) <= (new Date(endDate.value))
    );

    if(filterShiftByDate.length > 0){
        table(filterShiftByDate);
    } else {window.location.reload();}

    startDate.value = '';
    endDate.value = '';
})

// Search shift by name
let searchSiftByName = document.getElementById('searchShiftName');
searchSiftByName.addEventListener('keyup', function(){
    let filterShiftByName = shifts.filter(el => el.shiftSlug.includes(searchSiftByName.value.toLowerCase()));
    table(filterShiftByName);
})

// Display shift in Add/Modify area
let indexGlobal;

function displayShift(index){
    date.value = shifts[index].date;
    startTime.value = shifts[index].startTime;
    endTime.value = shifts[index].endTime;
    salaryPerHour.value = shifts[index].salaryPerHour;
    place.value = shifts[index].place;
    slug.value = shifts[index].shiftSlug;
    comment.value = shifts[index].comments;
    btnAddShift.textContent = 'Modify';
    indexGlobal = index;
}
// Edit shift
function editShift(){

    let timeStart = new Date(`${date.value} ${startTime.value}`);
    let timeEnd = new Date(`${date.value} ${endTime.value}`);
    let salaryPerShift;
  
    let timeShift = (timeEnd.getHours() + (timeEnd.getMinutes()/60) - (timeStart.getHours() + timeStart.getMinutes()/60));
    if(timeShift > 0){
        salaryPerShift = +(timeShift * (salaryPerHour.value)).toFixed(2);
    } else{salaryPerShift = +(-timeShift * (salaryPerHour.value)).toFixed(2);}

    let editedShift = shifts[indexGlobal];
    editedShift.date = date.value;
    editedShift.startTime = startTime.value;
    editedShift.endTime = endTime.value;
    editedShift.salaryPerHour = salaryPerHour.value;
    editedShift.place = place.value;
    editedShift.shiftSlug = slug.value.toLowerCase();
    editedShift.salaryPerShift = salaryPerShift;
    editedShift.comments = comment.value;
    shifts.splice(indexGlobal, 1, editedShift);
    user.userShifts = shifts;
    users.splice(users.indexOf(user), 1, user);
    btnAddShift.textContent = 'Add Shift';
    localStorage.setItem('users', JSON.stringify(users));

    clearInputs();
}
// Clear inputs
function clearInputs(){
    date.value = '';
    startTime.value = '';
    endTime.value = '';
    salaryPerHour.value = '';
    place.value = '';
    slug.value = '';
    comment.value ='';
}

// The End


















