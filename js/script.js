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