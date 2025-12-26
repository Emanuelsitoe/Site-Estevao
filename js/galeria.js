document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica do Menu Hambúrguer ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Alternar menu ao clicar no hambúrguer
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    
});




document.getElementById('loadMoreEvents').addEventListener('click', function() {
    const hiddenEvents = document.querySelectorAll('.hidden-event');
    
    hiddenEvents.forEach((event, index) => {
        setTimeout(() => {
            event.style.display = 'block';
            event.style.animation = 'fadeIn 1s ease forwards';
        }, index * 300);
    });

    this.style.display = 'none'; // Some após carregar tudo
});