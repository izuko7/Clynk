// Base de données simulée
const users = [
  {
    id: 1,
    nom: "Jean-Philippe",
    email: "jean@clynk.ci",
    password: "1234",
    role: "client"
  },
  {
    id: 2,
    nom: "Dr. Aris Thémis",
    email: "aris@clynk.ci",
    password: "1234",
    role: "medecin"
  }
];

// Récupérer les users enregistrés + ceux par défaut
function getUsers() {
  const saved = localStorage.getItem("users");
  const savedUsers = saved ? JSON.parse(saved) : [];
  return [...users, ...savedUsers];
}

// Inscription
function inscrire(nom, email, password, role) {
  const tous = getUsers();

  // Vérifier si l'email existe déjà
  const existe = tous.find(u => u.email === email);
  if (existe) {
    return { succes: false, message: "Cet email est déjà utilisé." };
  }

  // Créer le nouvel utilisateur
  const nouvelUser = {
    id: Date.now(),
    nom,
    email,
    password,
    role
  };

  // Sauvegarder dans localStorage
  const saved = localStorage.getItem("users");
  const savedUsers = saved ? JSON.parse(saved) : [];
  savedUsers.push(nouvelUser);
  localStorage.setItem("users", JSON.stringify(savedUsers));

  return { succes: true, message: "Compte créé avec succès !" };
}

// Connexion
function connecter(email, password) {
  const tous = getUsers();

  // Étape 1 : vérifier identité
  const user = tous.find(u => u.email === email && u.password === password);

  if (!user) {
    return { succes: false, message: "Email ou mot de passe incorrect." };
  }

  // Étape 2 : sauvegarder la session
  localStorage.setItem("userConnecte", JSON.stringify(user));

  // Étape 3 : rediriger selon le rôle
  if (user.role === "client") {
    window.location.href = "../dashboard/dashboard_client.html";
  } else if (user.role === "medecin") {
    window.location.href = "../dashboard/dashboard_medecin.html";
  }

  return { succes: true };
}

// Déconnexion
function deconnecter() {
  localStorage.removeItem("userConnecte");
  window.location.href = "../connexion/connexion.html";
}

// Protéger une page (à appeler en haut de chaque dashboard)
function protegerPage(roleRequis) {
  const user = localStorage.getItem("userConnecte");

  if (!user) {
    window.location.href = "../connexion/connexion.html";
    return null;
  }

  const userObj = JSON.parse(user);

  if (userObj.role !== roleRequis) {
    window.location.href = "../connexion/connexion.html";
    return null;
  }

  return userObj;
}

// Récupérer l'utilisateur connecté
function getUserConnecte() {
  const user = localStorage.getItem("userConnecte");
  return user ? JSON.parse(user) : null;
}