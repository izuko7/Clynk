const btnScan   = document.getElementById("btn-scan-qr");
const modal     = document.getElementById("modal-scan");
const btnFermer = document.getElementById("btn-fermer-scan");
const video     = document.getElementById("webcamVideo");

let stream = null;

btnScan.addEventListener("click", function(e) {
    e.preventDefault();
    modal.style.display = "flex";

    // Contraintes adaptées mobile
    const contraintes = {
        video: {
            facingMode: { ideal: "environment" }, // caméra arrière
            width: { ideal: 1280 },
            height: { ideal: 720 }
        }
    };

    navigator.mediaDevices.getUserMedia(contraintes)
    .then(function(s) {
        stream = s;
        video.srcObject = stream;
        video.play();
    })
    .catch(function(erreur) {
        // Si caméra arrière échoue, essayer caméra avant
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(s) {
            stream = s;
            video.srcObject = stream;
            video.play();
        })
        .catch(function(err) {
            document.getElementById("erreur-scan").textContent = 
                "Caméra bloquée — ouvrez le site en HTTPS. (" + err.message + ")";
        });
    });
});

btnFermer.addEventListener("click", function() {
    modal.style.display = "none";
    if (stream) {
        stream.getTracks().forEach(function(track) {
            track.stop();
        });
        stream = null;
        video.srcObject = null;
    }
});