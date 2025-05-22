// master.js - Versión optimizada para Firefox

/**
 * Abre el modal con los datos del servicio
 */
function openModal(title, description, image, phone, email, location, extraInfo = '') {
    const modal = document.getElementById('contactModal');
    const modalExtraInfo = document.getElementById('modalExtraInfo');

    if (!modal || !modalExtraInfo) {
        console.error('Elementos del modal no encontrados');
        return;
    }

    // Asignar contenido
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;

    // Precargar imagen para Firefox
    const imgLoader = new Image();
    imgLoader.src = image;
    imgLoader.onload = function() {
        document.getElementById('modalLogo').src = image;
        document.getElementById('modalLogo').alt = title;
    };

    document.getElementById('modalPhone').textContent = phone;
    document.getElementById('modalEmail').textContent = email;
    document.getElementById('modalLocation').textContent = location;

    // Manejo de información extra
    if(extraInfo) {
        modalExtraInfo.textContent = extraInfo;
        modalExtraInfo.style.display = 'block';
    } else {
        modalExtraInfo.style.display = 'none';
    }

    // Mostrar modal
    modal.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
}

/**
 * Cierra el modal
 */
function closeModal() {
    const modal = document.getElementById('contactModal');
    if (!modal) return;

    modal.classList.remove('active');
    document.documentElement.style.overflow = '';
}

// Configuración inicial del modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('.close-modal');

    // Cerrar modal al hacer clic fuera o en el botón de cerrar
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this || e.target === closeBtn) {
                closeModal();
            }
        });
    }

    // Prevenir el cierre al hacer clic dentro del contenido
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

/**
 * Inicialización del carrusel (compatible con Firefox)
 */
function initCarousel() {
    const slide = document.querySelector('.carousel-slide');
    if (!slide) return;

    const images = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (images.length === 0) return;

    let counter = 0;
    let size = 0;
    let intervalId;
    const intervalTime = 3000;
    let dots = [];
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Inicializar tamaño del carrusel
    function initSize() {
        size = slide.parentElement.offsetWidth;
        slide.style.width = `${size * images.length}px`;

        images.forEach(img => {
            img.style.width = `${size}px`;
            img.style.height = 'auto';
        });
    }

    // Crear puntos indicadores
    function createDots() {
        if (!dotsContainer) return;

        dotsContainer.innerHTML = '';
        images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                counter = index;
                updateSlide();
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        dots = document.querySelectorAll('.dot');
        if (dots.length > 0) dots[0].classList.add('active');
    }

    // Actualizar la posición del slide
    function updateSlide() {
        slide.style.transform = `translateX(${-size * counter}px)`;

        // Actualizar puntos activos
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === counter);
        });
    }

    // Reiniciar intervalo automático
    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }

    // Iniciar intervalo automático
    function startInterval() {
        intervalId = setInterval(() => {
            nextSlide();
        }, intervalTime);
    }

    // Navegar a la siguiente imagen
    function nextSlide() {
        counter = (counter + 1) % images.length;
        updateSlide();
    }

    // Navegar a la imagen anterior
    function prevSlide() {
        counter = (counter - 1 + images.length) % images.length;
        updateSlide();
    }

    // Manejar eventos táctiles (para móviles)
    function setupTouchEvents() {
        slide.addEventListener('touchstart', touchStart);
        slide.addEventListener('touchmove', touchMove);
        slide.addEventListener('touchend', touchEnd);
    }

    function touchStart(e) {
        isDragging = true;
        startPos = e.touches[0].clientX;
        prevTranslate = -size * counter;
        clearInterval(intervalId);
    }

    function touchMove(e) {
        if (!isDragging) return;
        const currentPosition = e.touches[0].clientX;
        const diff = currentPosition - startPos;
        currentTranslate = prevTranslate + diff;
        slide.style.transform = `translateX(${currentTranslate}px)`;
    }

    function touchEnd() {
        if (!isDragging) return;
        isDragging = false;

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && counter < images.length - 1) {
            counter++;
        }

        if (movedBy > 100 && counter > 0) {
            counter--;
        }

        updateSlide();
        resetInterval();
    }

    // Inicializar el carrusel cuando las imágenes carguen
    function checkImagesLoaded() {
        let loadedCount = 0;

        images.forEach(img => {
            if (img.complete) {
                loadedCount++;
            } else {
                img.addEventListener('load', () => {
                    loadedCount++;
                    if (loadedCount === images.length) {
                        initCarouselComplete();
                    }
                });
            }
        });

        if (loadedCount === images.length) {
            initCarouselComplete();
        }
    }

    function initCarouselComplete() {
        initSize();
        createDots();
        updateSlide();
        startInterval();

        // Event listeners para controles
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        // Pausar al interactuar
        slide.addEventListener('mouseenter', () => clearInterval(intervalId));
        slide.addEventListener('mouseleave', resetInterval);

        // Manejar redimensionamiento
        window.addEventListener('resize', () => {
            initSize();
            updateSlide();
        });

        // Soporte para arrastre en móviles
        setupTouchEvents();
    }

    // Iniciar la verificación de carga de imágenes
    checkImagesLoaded();
}

// Inicializar el carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initCarousel);

// Polyfill para matches si es necesario
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

// Exportar funciones para uso global (si es necesario)
window.openModal = openModal;
window.closeModal = closeModal;
