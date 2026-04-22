// Afficher le mot de passe des pages de création de compte
const input = document.getElementById('password-inscription');
const incon = document.querySelector('.toggle-password');

function togglePassword() {
    if (input.type === "password") {
        input.type = 'text';
        incon.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
        input.type = "password";
        incon.classList.replace('fa-eye', 'fa-eye-slash');
    }
}

// Afficher le mot de passe de la page de connexion

const input1 = document.getElementById('password');
const icon1 = document.querySelector('.toggle-password');

function togglePasswordConnexion(){
    if(input1.type === 'password') {
        input1.type = 'text';
        incon1.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
        input1.type = "password";
         incon1.classList.replace('fa-eye', 'fa-eye-slash');
    }
}