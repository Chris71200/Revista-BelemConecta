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

// Script para el carrusel
document.addEventListener('DOMContentLoaded', function() {
    const carouselSlide = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (carouselSlide && images.length > 0 && prevBtn && nextBtn) {
        let counter = 0;
        const size = images[0].clientWidth;

        // Configuración inicial
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

        // Listeners para botones
        nextBtn.addEventListener('click', () => {
            if (counter >= images.length - 1) return;
            counter++;
            carouselSlide.style.transition = "transform 0.5s ease-in-out";
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        });

        prevBtn.addEventListener('click', () => {
            if (counter <= 0) return;
            counter--;
            carouselSlide.style.transition = "transform 0.5s ease-in-out";
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        });

        // Reiniciar al llegar al final
        carouselSlide.addEventListener('transitionend', () => {
            if (images[counter].id === 'lastClone') {
                carouselSlide.style.transition = "none";
                counter = images.length - 2;
                carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            }
            if (images[counter].id === 'firstClone') {
                carouselSlide.style.transition = "none";
                counter = images.length - counter;
                carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            }
        });
    }
});
