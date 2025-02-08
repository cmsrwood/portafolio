// Puedes añadir funcionalidades como:
// - Carga dinámica de proyectos desde GitHub API
// - Animaciones adicionales
// - Validación de formulario

document.addEventListener('DOMContentLoaded', function () {
    // Ejemplo: Cargar repositorios de GitHub
    fetch('https://api.github.com/users/tu_usuario/repos')
        .then(response => response.json())
        .then(data => {
            // Procesar datos y crear tarjetas
        });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});