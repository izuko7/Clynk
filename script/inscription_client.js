document.getElementById("btn-creer")?.addEventListener("click", function (e) {
  e.preventDefault();

  const nom = document.getElementById("nom")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const telephone = document.getElementById("telephone")?.value.trim();
  const password = document
    .getElementById("password-inscription")
    ?.value.trim();
  const cgu = document.getElementById("cgu")?.checked;
  const erreur = document.getElementById("erreur");

  if (!nom || !email || !password) {
    erreur.textContent = "Veuillez remplir tous les champs obligatoires.";
    return;
  }

  if (!cgu) {
    erreur.textContent = "Vous devez accepter les conditions d'utilisation.";
    return;
  }

  const tous = getUsers();
  const existe = tous.find((u) => u.email === email);
  if (existe) {
    erreur.textContent = "Cet email est déjà utilisé.";
    return;
  }

  const nouvelUser = {
    id: Date.now(),
    nom,
    email,
    telephone,
    password,
    role: "client",
  };

  const saved = localStorage.getItem("users");
  const users = saved ? JSON.parse(saved) : [];
  users.push(nouvelUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("userConnecte", JSON.stringify(nouvelUser));

  window.location.href = "../Dashboard/dashboard_client.html";
});
