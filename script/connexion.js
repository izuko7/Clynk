// Connexion
document.getElementById("btn-connexion")?.addEventListener("click", function(e) {
    e.preventDefault();

    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const erreur   = document.getElementById("erreur");

    // Validation
    if (!email || !password) {
        erreur.textContent = "Veuillez remplir tous les champs.";
        return;
    }

    // Récupérer tous les users
    const saved = localStorage.getItem("users");
    const users = saved ? JSON.parse(saved) : [];

    // Users par défaut pour tester
    const usersDefaut = [
        { id: 1, nom: "Jean-Philippe", email: "jean@clynk.ci", password: "1234", role: "client" },
        { id: 2, nom: "Dr. Aris Thémis", email: "aris@clynk.ci", password: "1234", role: "medecin" }
    ];

    const tousLesUsers = [...usersDefaut, ...users];

    // Vérifier identité
    const user = tousLesUsers.find(u => u.email === email && u.password === password);

    if (!user) {
        erreur.textContent = "Email ou mot de passe incorrect.";
        return;
    }

    // Sauvegarder la session
    localStorage.setItem("userConnecte", JSON.stringify(user));

    // Rediriger selon le rôle
    if (user.role === "client") {
        window.location.href = "../Dashboard/dashboard_client.html";
    } else if (user.role === "medecin") {
        window.location.href = "../Dashboard/dashboard_medecin.html";
    }
});