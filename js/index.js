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

    // --- Animação de Scroll (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Ativa quando 15% do elemento estiver visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Para de observar após animar
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // --- Efeito de Scroll Suave para links de âncora (Compatibilidade extra) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetID = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetID);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});


//modal
// --- Lógica da Modal de Partituras ---
const modal = document.getElementById('score-modal');
const openModalBtns = document.querySelectorAll('.open-score-modal');
const closeModalBtns = document.querySelectorAll('.close-modal, .close-trigger');
const modalIframe = document.getElementById('modal-iframe');

// Elementos para preencher dinamicamente
const mTitle = document.getElementById('modal-title');
const mDesc = document.getElementById('modal-description');
const mDuration = document.getElementById('modal-duration');
const mInstrument = document.getElementById('modal-instrument');
const mDownload = document.getElementById('modal-download');
const modalAudioIframe = document.getElementById('modal-audio-iframe');
const audioContainer = document.getElementById('audio-container');

// Função para abrir a modal
openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        // 1. Pegar dados do botão clicado
        const title = btn.getAttribute('data-title');
        const videoSrc = btn.getAttribute('data-video');
        const desc = btn.getAttribute('data-desc');
        const pdf = btn.getAttribute('data-pdf');
        const time = btn.getAttribute('data-time');
        const inst = btn.getAttribute('data-inst');
        const audioSrc = btn.getAttribute('data-audio');

        // 2. Preencher a modal
        mTitle.textContent = title;
        // Importante: garante que o vídeo tenha autoplay ou parâmetros corretos se necessário
        modalIframe.src = videoSrc; 
        mDesc.textContent = desc;
        mDuration.textContent = time;
        mInstrument.textContent = inst;
        mDownload.href = pdf;
        // Lógica para o áudio
        if (audioSrc && audioSrc.trim() !== "") {
            modalAudioIframe.src = audioSrc;
            audioContainer.classList.remove('hidden-audio'); // Mostra a div
        } else {
            modalAudioIframe.src = "";
            audioContainer.classList.add('hidden-audio'); // Esconde a div se não tiver link
        }
        // 3. Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede rolagem da página de fundo
    });
});


// Função para fechar a modal
const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restaura rolagem
    
    // IMPORTANTE: Limpa o src do iframe para parar o som do vídeo
    const currentSrc = modalIframe.src;
    modalIframe.src = ''; 
};

// Eventos de fechar
closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

// Fechar ao clicar fora da caixa da modal (no overlay escuro)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Fechar com a tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// --- Lógica da Modal de Playlist ---
// Cole o JavaScript da Seção 3 aqui
        const modal1 = document.querySelector('.modal-playlist');
        const openModalBtn = document.getElementById('openModalBtn');
        const closeBtn = document.querySelector('.close-playlist-btn');

        // Inicialmente, esconde a modal no carregamento
        modal1.style.display = 'none';

        openModalBtn.onclick = function() {
            modal1.style.display = 'flex';
        }

        closeBtn.onclick = function() {
            modal1.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target === modal) {
                modal1.style.display = 'none';
            }
        }