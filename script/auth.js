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
  window.location.href = "../index.html";
}
