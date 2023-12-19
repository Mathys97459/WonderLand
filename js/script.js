// Ajoutez ceci à votre fichier JS
document.querySelector('.menu-toggle').addEventListener('click', function () {
    document.querySelector('.nav-bottom').classList.toggle('menu-active');
  });
  

//SCROLL MENU
const navBottom = document.querySelector('.nav-bottom');

// Ajoutez un gestionnaire d'événements pour le scroll
window.addEventListener('scroll', function() {
    // Obtenez la position actuelle de défilement verticale
    const scrollPosition = window.scrollY;

    // Déterminez la position de votre choix
    if (scrollPosition >=35){
        navBottom.style.position = "fixed";
        navBottom.style.marginTop = 30 + "px";
        navBottom.style.width = 90 + "%";
    }else{
        navBottom.style.position = "absolute";
        navBottom.style.marginTop = 4 + "rem";
        navBottom.style.width = 90 + "%";
    }

    // Modifiez la position de .nav-bottom en fonction de la position de défilement
    
});