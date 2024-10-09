const particlesContainer = document.querySelector('.particles');

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Задаем случайные размеры и позиции
    const size = Math.random() * 5 + 2; // Размер от 2 до 7 пикселей
    particle.style.width = ${size}px;
    particle.style.height = ${size}px;
    
    particle.style.left = ${Math.random() * window.innerWidth}px;
    particle.style.top = ${Math.random() * window.innerHeight}px;
    
    // Добавляем частицу в контейнер
    particlesContainer.appendChild(particle);
    
    // Анимация движения
    const animationDuration = Math.random() * 5 + 5; // Длительность анимации от 5 до 10 секунд
    particle.animate([
        { transform: translateY(0) },
        { transform: translateY(${window.innerHeight}px) }
    ], {
        duration: animationDuration * 1000,
        easing: 'linear',
        iterations: Infinity,
        direction: 'normal'
    });

    // Удаляем частицу после завершения анимации
    setTimeout(() => {
        particle.remove();
    }, animationDuration * 1000);
}

// Создаем частицы каждые 300 миллисекунд
setInterval(createParticle, 300);
