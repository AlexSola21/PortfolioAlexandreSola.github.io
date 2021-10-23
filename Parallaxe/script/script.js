$(window).scroll(function () {
    parallax();
})

function parallax() {
    var wScroll = $(window).scrollTop();


    $('.parralax1, .parralax4, .parralax2, .parralax3, .parralax5').css('background-position', 'center ' +(wScroll*0.1)+'px')
}






/*

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {
        slideIndex = 1
    } console.log("dot")
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}



let etatLecteur;

      function lecteurPret(event) {
        // event.target = lecteur
        event.target.setVolume(50);
      }

      function changementLecteur(event) {
        // event.data = état du lecteur
        etatLecteur = event.data;
      }

      let lecteur;

      function onYouTubeIframeAPIReady() {
        lecteur = new YT.Player("#video", {
          height: "390",
          width: "640",
          videoId: "Sc-0S8z1jFA",
          playerVars: {
            color: "white",
            enablejsapi: 1,
            modestbranding: 1,
            rel: 0
          },
          events: {
            onReady: lecteurPret,
            onStateChange: changementLecteur
          }
        });
      }

      // Hauteur de la vidéo
      const hauteurVideo = $("#video").height();
      // Position Y de la vidéo
      const posYVideo = $("#video").offset().top;
      // Valeur declenchant la modification de l'affichage (choix "esthétique")
      const seuil = posYVideo + 0.75 * hauteurVideo;

      // Gestion du défilement
      $(window).scroll(function () {
        // Récupération de la valeur du défilement vertical
        const scroll = $(window).scrollTop();

        // Classe permettant l'exécution du CSS
        $("#video").toggleClass(
          "scroll",
          etatLecteur === YT.PlayerState.PLAYING && scroll > seuil
        );
      });


*/

  

// Appelée si récupération des coordonnées réussie
function positionSucces(position) {
  // Injection du résultat dans du texte
  const lat = Math.round(1000 * position.coords.latitude) / 1000;
  const long = Math.round(1000 * position.coords.longitude) / 1000;
  $("section:nth-of-type(5)>p").text(`Latitude: ${lat}°, Longitude: ${long}°`);
}

// Appelée si échec de récuparation des coordonnées
function positionErreur(erreurPosition) {
  // Cas d'usage du switch !
  let natureErreur;
  switch (erreurPosition.code) {
    case erreurPosition.TIMEOUT:
      // Attention, durée par défaut de récupération des coordonnées infini
      natureErreur = "La géolocalisation prends trop de temps...";
      break;
    case erreurPosition.PERMISSION_DENIED:
      natureErreur = "Vous n'avez pas autorisé la géolocalisation.";
      break;
    case erreurPosition.POSITION_UNAVAILABLE:
      natureErreur = "Votre position n'a pu être déterminée.";
      break;
    default:
      natureErreur = "Une erreur inattendue s'est produite.";
  }
  // Injection du texte
  $("section:nth-of-type(5)>p").text(natureErreur);
}


/*
function toggleText() {
  var text = document.getElementById("demo");
  if (text.style.display === "none") {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

*/

/*

// Appelée si récupération des coordonnées réussie
function positionSucces(position) {
  // Injection du résultat dans du texte
  const lat = Math.round(1000 * position.coords.latitude) / 1000;
  const long = Math.round(1000 * position.coords.longitude) / 1000;
  $("section:nth-of-type(5)>p").text(`Latitude: ${lat}°, Longitude: ${long}°`);
}

// Appelée si échec de récuparation des coordonnées
function positionErreur(erreurPosition) {
  // Cas d'usage du switch !
  let natureErreur;
  switch (erreurPosition.code) {
    case erreurPosition.TIMEOUT:
      // Attention, durée par défaut de récupération des coordonnées infini
      natureErreur = "La géolocalisation prends trop de temps...";
      break;
    case erreurPosition.PERMISSION_DENIED:
      natureErreur = "Vous n'avez pas autorisé la géolocalisation.";
      break;
    case erreurPosition.POSITION_UNAVAILABLE:
      natureErreur = "Votre position n'a pu être déterminée.";
      break;
    default:
      natureErreur = "Une erreur inattendue s'est produite.";
  }
  // Injection du texte
  $("section:nth-of-type(5)>p").text(natureErreur);
}*/

// Récupération des coordonnées au clic sur le bouton
$("button").click(function () {
  // Support de la géolocalisation
  if ("geolocation" in navigator) {
    // Support = exécution du callback selon le résultat
    navigator.geolocation.getCurrentPosition(positionSucces, positionErreur, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 30000
    });
  } else {
    // Non support = injection de texte
    $("section:nth-of-type(5)>p").text("La géolocalisation n'est pas supportée par votre navigateur");
  }
});




// Création de la carte, vide à ce stade
let carte = L.map('carte', {
  center: [47.2608333, 2.4188888888888886], // Centre de la France
  zoom: 5,
  minZoom: 4,
  maxZoom: 19,
});

// Ajout des tuiles (ici OpenStreetMap)
// https://wiki.openstreetmap.org/wiki/Tiles#Servers
L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(carte);

// Ajout de l'échelle
L.control.scale().addTo(carte);