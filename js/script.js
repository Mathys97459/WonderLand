function toggleMenu() {
    var navbarLinks = document.getElementById("navbarLinks");
    if (navbarLinks.style.display === "block") {
        navbarLinks.style.display = "none";
    } else {
        navbarLinks.style.display = "block";
    }
}

//SCROLL MENU
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    const navTop = document.querySelector('.nav-top');
    console.log(window.scrollY)
    if (window.scrollY > 50) {
        navTop.style.backgroundColor = '#000'; // Changez la couleur ici
    } else {
        navTop.style.backgroundColor = 'transparent'; // Retour à la couleur transparente lorsque la page est au-dessus de la hauteur de la barre de navigation
    }
});

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