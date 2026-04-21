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