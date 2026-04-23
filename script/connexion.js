document
  .getElementById("btn-connexion")
  ?.addEventListener("click", function (e) {
    e.preventDefault();

    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();
    const erreur = document.getElementById("erreur");

    if (!email || !password) {
      erreur.textContent = "Veuillez remplir tous les champs.";
      return;
    }

    const tous = getUsers();
    const user = tous.find((u) => u.email === email && u.password === password);

    if (!user) {
      erreur.textContent = "Email ou mot de passe incorrect.";
      return;
    }

    localStorage.setItem("userConnecte", JSON.stringify(user));

    if (user.role === "client") {
      window.location.href = "../Dashboard/dashboard_client.html";
    } else if (user.role === "medecin") {
      window.location.href = "../Dashboard/dashboard_medecin.html";
    }
  });
