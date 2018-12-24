'use strict';


function validation(inputReg, error__desc, inputData, type) {
    let stan;
    if (type === 'text') {
        if (!inputReg.test(inputData.value)) {
            inputData.classList.add('text__error')
            inputData.classList.remove('text__valid')
            inputData.parentElement.querySelector('.personal__error').innerHTML = error__desc;
            stan = false;
        } else {
            inputData.parentElement.querySelector('.personal__error').innerHTML = '';
            inputData.classList.remove('text__error')
            inputData.classList.add('text__valid')
            stan = true;
        } 
    }
    return stan;
}

function validationPassword(error__desc, inputData, inputDataRepeat) {
    let stan = true;
    if (inputData.value === "" || inputData.value != inputDataRepeat.value) {
        inputDataRepeat.parentElement.querySelector('.personal__error').innerHTML = error__desc;
        inputDataRepeat.classList.add('text__error')
        inputDataRepeat.classList.remove('text__valid')
        stan = false;
    } else {
        inputDataRepeat.parentElement.querySelector('.personal__error').innerHTML = '';
        inputDataRepeat.classList.remove('text__error')
        inputDataRepeat.classList.add('text__valid')
        stan = true;
    } 
    return stan;    
}

document.querySelector('form').addEventListener('submit', function(event) {
    let isFormValidate = true;

    const nameReg = new RegExp('^[A-Z][a-z]{2,}$', '');
    
    const surnameReg = new RegExp('^[A-Z][a-z-]{2,}$', 'g');
    const mailReg = new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$', 'gi');
    const walletReg = new RegExp('^[-]{0,1}[0-9]+$','');
    const phoneReg = new RegExp('^[-]{0,1}[0-9]+$','');
    const passwordReg = new RegExp('^[0-9a-zA-Z_-]+$','gi');

    if (!validation(nameReg, 'First capital letter and min. 2 characters', event.target.querySelector('input[name="personalName"]'), 'text')) {
        isFormValidate = false; 
    }

    if (!validation(surnameReg, 'First capital letter and min. 2 characters', event.target.querySelector('input[name="personalSurname"]'), 'text')) {
        isFormValidate = false; 
    }

    if (!validation(mailReg, 'Wrong mail', event.target.querySelector('input[name="personalEmail"]'), 'text')) {
        isFormValidate = false; 
    }

    if (!validation(phoneReg, 'Wrong format', event.target.querySelector('input[name="personalPhone"]'), 'text')) {
        isFormValidate = false; 
    }

    if (!validation(walletReg, 'Wrong format', event.target.querySelector('input[name="personalWallet"]'), 'text')) {
        isFormValidate = false; 
    }

    if (!validation(passwordReg, 'Wrong format', event.target.querySelector('input[name="personalPassword"]'), 'text')) {
        isFormValidate = false; 
    }

    if (!validationPassword('Wrong password', event.target.querySelector('input[name="personalPassword"]'), event.target.querySelector('input[name="personalPasswordRepeat"]'))) {
        isFormValidate = false; 
    }

    return !isFormValidate ? event.preventDefault() : true;
  })