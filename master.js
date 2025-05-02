// Función para abrir el modal con los datos del servicio
function openModal(title, description, image, phone, email, location, extraInfo = '') {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalLogo').src = image;
    document.getElementById('modalPhone').textContent = phone;
    document.getElementById('modalEmail').textContent = email;
    document.getElementById('modalLocation').textContent = location;

    if(extraInfo) {
        document.getElementById('modalExtraInfo').textContent = extraInfo;
        document.getElementById('modalExtraInfo').style.display = 'block';
    } else {
        document.getElementById('modalExtraInfo').style.display = 'none';
    }

    document.getElementById('contactModal').classList.add('active');
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('contactModal').classList.remove('active');
}

// Cerrar modal al hacer clic fuera del contenido
document.getElementById('contactModal').addEventListener('click', function(e) {
    if(e.target === this) {
        closeModal();
    }
});

// Carrusel automático con puntos
document.addEventListener('DOMContentLoaded', function() {
    const slide = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.querySelector('.carousel-dots');

    let counter = 0;
    const size = images[0].clientWidth;
    let intervalId;
    const intervalTime = 3000; // 3 segundos (ajustable)

    // Crea los puntos dinámicamente
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

    // Inicializa el primer punto como activo
    const dots = document.querySelectorAll('.dot');
    dots[0].classList.add('active');

    // Función para actualizar la slide y los puntos
    function updateSlide() {
        slide.style.transform = `translateX(${-size * counter}px)`;

        // Actualiza el punto activo
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === counter);
        });
    }

    // Función para resetear el intervalo automático
    function resetInterval() {
        clearInterval(intervalId);
        intervalId = setInterval(nextSlide, intervalTime);
    }

    // Navegación automática
    function nextSlide() {
        counter = (counter + 1) % images.length;
        updateSlide();
    }

    // Event listeners para los botones
    nextBtn.addEventListener('click', () => {
        counter = (counter + 1) % images.length;
        updateSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        counter = (counter - 1 + images.length) % images.length;
        updateSlide();
        resetInterval();
    });

    // Inicia el intervalo automático
    intervalId = setInterval(nextSlide, intervalTime);

    // Pausa el carrusel al pasar el mouse (opcional)
    slide.addEventListener('mouseenter', () => clearInterval(intervalId));
    slide.addEventListener('mouseleave', () => {
        intervalId = setInterval(nextSlide, intervalTime);
    });
});
