// Inscription client 

document.getElementById('btn-creer')?.addEventListener('click', function(e) {
    e.preventDefault();

    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const password = document.getElementById("password-inscription").value.trim();
    const cgu = document.getElementById("cgu").value.checked;
    const erreur = document.getElementById("erreur");

    if(!nom || !email || !password) {
        erreur.textContent = "Veuillez remplir tous les champs obligatoires.";
        return;
    }

    if(!cgu) {
        erreur.textContent = "Vous devez accepter les conditions d'utilisation.";
        return;
    }

    const saved = localStorage.getItem("users");
    const users = saved ? JSON.parse(saved) : [];

    const existe = users.find(u => u.email === email);
    if(existe) {
        erreur.textContent = "Cet email est déjà utilisé";
        return;
    }

    const nouvelUtilisateur = {
        id : Date.now(),
        nom,
        email,
        telephone,
        password,
        role: "client"
    };

    users.push(nouvelUtilisateur);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("userConnecte", JSON.stringify(nouvelUtilisateur));

    window.location.href = "../Dashboard/dashboard_client.html";
    
}) 