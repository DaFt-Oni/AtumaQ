//Menú despliegue dropwon
document.getElementById('nav-toggle').addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
    this.classList.toggle('active');
    event.stopPropagation();
});

document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    // Verifica si el clic fue fuera del menú o del botón de toggle
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});



//Expansión de cartas
function toggleCard(card) {
    card.classList.toggle('expanded');
}