const btnScan    = document.getElementById("btn-scan-qr");
const modal      = document.getElementById("modal-scan");
const btnFermer  = document.getElementById("btn-fermer-scan");
const erreur     = document.getElementById("erreur-scan");
const video      = document.getElementById("webcamVideo");

let stream       = null;
let animFrame    = null;

// =====================
// OUVRIR MODAL + CAMÉRA
// =====================
btnScan.addEventListener("click", function(e) {
    e.preventDefault();
    erreur.textContent = "";
    modal.style.display = "flex";

    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: "environment",
            width:  { ideal: 1280 },
            height: { ideal: 720 }
        }
    })
    .then(function(s) {
        stream = s;
        video.srcObject = stream;
        video.play();
        video.addEventListener("loadedmetadata", demarrerScan);
    })
    .catch(function() {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(s) {
            stream = s;
            video.srcObject = stream;
            video.play();
            video.addEventListener("loadedmetadata", demarrerScan);
        })
        .catch(function(err) {
            erreur.textContent = "Caméra inaccessible : " + err.message;
        });
    });
});

// =====================
// SCANNER LE QR CODE
// =====================
function demarrerScan() {
    const canvas  = document.createElement("canvas");
    const context = canvas.getContext("2d");

    function lire() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width  = video.videoWidth;
            canvas.height = video.videoHeight;

            // Améliorer contraste pour mieux lire
            context.filter = "contrast(1.5) brightness(1.2)";
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "attemptBoth",
            });

            if (code) {
                arreter();
                traiterQR(code.data);
                return;
            }
        }
        animFrame = requestAnimationFrame(lire);
    }

    animFrame = requestAnimationFrame(lire);
}

// =====================
// TRAITER LE QR CODE
// =====================
function traiterQR(texte) {
    console.log("QR détecté :", texte);
    console.log("Longueur :", texte.length);

    // Si le texte est vide
    if (!texte || texte.trim() === "") {
        erreur.textContent = "QR Code vide — réessayez.";
        return;
    }

    // Essayer comme URL
    try {
        const url    = new URL(texte);
        const params = new URLSearchParams(url.search);
        const id     = params.get("id");

        if (id) {
            window.location.href = "scan.html?id=" + id;
            return;
        }
    } catch(e) {}

    // Essayer comme texte simple contenant un id
    if (texte.includes("id=")) {
        const id = texte.split("id=")[1].split("&")[0];
        if (id) {
            window.location.href = "scan.html?id=" + id;
            return;
        }
    }

    // Afficher ce qui a été lu
    erreur.textContent = "Lu : " + texte;
}

// =====================
// ARRÊTER CAMÉRA
// =====================
function arreter() {
    modal.style.display = "none";
    cancelAnimationFrame(animFrame);
    animFrame = null;

    if (stream) {
        stream.getTracks().forEach(function(track) {
            track.stop();
        });
        stream = null;
        video.srcObject = null;
    }
}

btnFermer.addEventListener("click", arreter);