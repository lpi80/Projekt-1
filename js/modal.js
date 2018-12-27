function closeModal() {
    document.getElementById('overlay').classList.remove('show')
}


document.querySelectorAll('#overlay .js--close-modal').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault()
        closeModal()
    })
})

document.querySelector('#overlay').addEventListener('click', function(e) {
    if(e.target === this) {
      closeModal()
    }
  })

  document.addEventListener('keyup', function(e) {
    if(e.keyCode === 27) {
      closeModal()
    }
  })

  function openModal(modal) {
    document.querySelectorAll('#overlay > *').forEach(function(modal) {
      modal.classList.remove('show')
    })
    document.querySelector('#overlay').classList.add('show')
    document.querySelector(modal).classList.add('show')
  }

document.getElementById('notifacationName').addEventListener('click', function(e) {
  let inputData = document.querySelector('input[name="loginPassword"]');
  inputData.parentElement.querySelector('.personal__error').innerHTML = '';
  inputData.parentElement.querySelector('.personal__info').innerHTML = '';
  inputData.classList.remove('text__error');
  inputData.classList.remove('text__info');
  openModal('#modalLogin',e);
},false)

document.getElementById('btnExit').addEventListener('click', function(e) {
  openModal('#modalQuit',e);
},false)


function validationWithInfo(inputReg, error__desc, info__desc, inputData, type) {
  let stan;
if (type === 'text') {
      if (!inputReg.test(inputData.value)) {
          inputData.classList.add('text__error');
          inputData.classList.add('text__info');
          inputData.parentElement.querySelector('.personal__error').innerHTML = error__desc;
          inputData.parentElement.querySelector('.personal__info').innerHTML = info__desc;
          stan = false;
      } else {
          inputData.parentElement.querySelector('.personal__error').innerHTML = '';
          inputData.parentElement.querySelector('.personal__info').innerHTML = '';
          inputData.classList.remove('text__error');
          inputData.classList.remove('text__info');
          stan = true;
      } 
  }
  return stan;
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
  let isFormValidate = true;

  const passwordReg = new RegExp('^[0-9a-zA-Z_-]+$','gi');

  if (!validationWithInfo(passwordReg, 'Password is wrong', 'Did you forget it?', event.target.querySelector('input[name="loginPassword"]'), 'text')) {
      isFormValidate = false; 
  }

  return !isFormValidate ? event.preventDefault() : true;
})
