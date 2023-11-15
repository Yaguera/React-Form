const form = document.querySelector("form")
const formInputs = document.getElementById("formulario")
const dados = document.getElementById("dados")
const listItem = document.getElementById('formDataList')
const loadingMessage = document.getElementById('loading');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordInput = document.getElementById('password').value;
    showLoadingMessage()

    validatePasswordPromise(passwordInput)
        .then(function () {
            const username = document.getElementById('user').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const estadoCivil = document.getElementById('form-selection').value;

            document.getElementById('user').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.getElementById('form-selection').value = '';
            document.getElementById('terms').checked = false;
            listItem.innerHTML = "";
            passwordError.innerHTML = "";

            setTimeout(() => {
                listItem.innerHTML += `<li> Nome: ${username}</li> <li>${email}</li> <li>Senha: ${password}</li> <li>Estado Civil: ${estadoCivil}</li>`;
                hideLoadingMessage();
            }, 2000)
        })
        .catch(function (error) {
            passwordError.innerHTML = error.message;
            hideLoadingMessage();
        });
})

function validatePasswordPromise(password) {
    return new Promise(function (resolve, reject) {
        if (password.length < 8) {
            reject(new Error('A senha deve ter no mínimo 8 digitos entre numeros, letras maiúsculas e minúsculas.'));
        } else if (!/[a-z]/.test(password)) {
            reject(new Error('A senha deve ter no mínimo 8 digitos entre numeros, letras maiúsculas e minúsculas.'));
        } else if (!/[A-Z]/.test(password)) {
            reject(new Error('A senha deve ter no mínimo 8 digitos entre numeros, letras maiúsculas e minúsculas.'));
        } else if (!/\d/.test(password)) {
            reject(new Error('A senha deve conter pelo menos um número.'));
        } else {
            resolve();
        }
    });
}

function showLoadingMessage() {
    loadingMessage.style.display = 'block';
}

function hideLoadingMessage() {
    loadingMessage.style.display = 'none';
}