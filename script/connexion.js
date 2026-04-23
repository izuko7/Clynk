// =====================
// USERS PAR DÉFAUT
// =====================
const usersDefaut = [
  {
    id: 1,
    nom: "Jean-Philippe",
    email: "jean@clynk.ci",
    password: "1234",
    role: "client",
  },
  {
    id: 2,
    nom: "Dr. Aris Thémis",
    email: "aris@clynk.ci",
    password: "1234",
    role: "medecin",
  },
];

// =====================
// UTILITAIRES
// =====================
function getUsers() {
  const saved = localStorage.getItem("users");
  const savedUsers = saved ? JSON.parse(saved) : [];
  return [...usersDefaut, ...savedUsers];
}

function getUserConnecte() {
  const user = localStorage.getItem("userConnecte");
  return user ? JSON.parse(user) : null;
}

function protegerPage(roleRequis) {
  const user = getUserConnecte();

  if (!user) {
    window.location.href = "../Auth/connexion.html";
    return null;
  }

  if (user.role !== roleRequis) {
    window.location.href = "../Auth/connexion.html";
    return null;
  }

  return user;
}

function deconnecter() {
  localStorage.removeItem("userConnecte");
  window.location.href = "../Auth/connexion.html";
}

// =====================
// TOGGLE MOT DE PASSE
// =====================
function togglePassword() {
  const input = document.getElementById("password-inscription");
  const icon = document.querySelector(".toggle-password");
  if (!input) return;
  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  }
}

function togglePasswordConnexion() {
  const input = document.getElementById("password");
  const icon = document.querySelector(".toggle-password");
  if (!input) return;
  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  }
}

// =====================
// CONNEXION
// =====================
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

// =====================
// INSCRIPTION CLIENT
// =====================
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

// =====================
// INSCRIPTION MÉDECIN
// =====================
document
  .getElementById("btn-creer-pro")
  ?.addEventListener("click", function (e) {
    e.preventDefault();

    const nom = document.getElementById("nom")?.value.trim();
    const rolePro = document.getElementById("role-pro")?.value;
    const rpps = document.getElementById("rpps")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document
      .getElementById("password-inscription")
      ?.value.trim();
    const cgu = document.getElementById("cgu")?.checked;
    const erreur = document.getElementById("erreur");

    if (!nom || !rpps || !email || !password) {
      erreur.textContent = "Veuillez remplir tous les champs obligatoires.";
      return;
    }

    if (!cgu) {
      erreur.textContent = "Vous devez accepter les conditions d'utilisation.";
      return;
    }

    const tous = getUsers();
    const existe = tous.find((u) => u.email === email || u.rpps === rpps);
    if (existe) {
      erreur.textContent = "Cet email ou numéro RPPS est déjà utilisé.";
      return;
    }

    const nouvelUser = {
      id: Date.now(),
      nom,
      email,
      rpps,
      rolePro,
      password,
      role: "medecin",
    };

    const saved = localStorage.getItem("users");
    const users = saved ? JSON.parse(saved) : [];
    users.push(nouvelUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("userConnecte", JSON.stringify(nouvelUser));

    window.location.href = "../Dashboard/dashboard_medecin.html";
  });

// =====================
// DÉCONNEXION
// =====================
document
  .querySelector(".sidebar-down a:last-child")
  ?.addEventListener("click", function (e) {
    e.preventDefault();
    deconnecter();
  });
