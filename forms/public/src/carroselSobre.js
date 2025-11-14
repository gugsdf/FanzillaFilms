document.addEventListener('DOMContentLoaded', () => {

    // --- Carrossel de Curiosidades ---

    const carouselImages = document.querySelectorAll('.carousel-image');
    const curiosidadeItems = document.querySelectorAll('#lista-curiosidades-hover li');
    const intervalTime = 5000; // 5 segundos
    let currentImageIndex = 0;
    let carouselInterval;
    let isHovering = false;

    // Se não houver imagens, pare a execução
    if (carouselImages.length === 0) return;

    // --- Funções de Navegação e Fade ---

    // Função principal para mostrar a imagem
    function showImage(index) {
        // Remove a classe 'active' de todas as imagens
        carouselImages.forEach(img => {
            img.classList.remove('active');
        });

        // Adiciona a classe 'active' à imagem desejada
        carouselImages[index].classList.add('active');
        currentImageIndex = index;
    }

    // Função para avançar automaticamente
    function nextImage() {
        if (!isHovering) {
            currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
            showImage(currentImageIndex);
        }
    }

    // Função para iniciar o carrossel automático
    function startCarousel() {
        // Limpa qualquer intervalo anterior para evitar duplicação
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextImage, intervalTime);
    }

    // --- Lógica de Hover (Pausar e Mudar) ---

    curiosidadeItems.forEach(item => {
        const index = parseInt(item.getAttribute('data-index'));

        // Mouse ENTRA (Pausa o carrossel e Muda para a foto do item)
        item.addEventListener('mouseenter', () => {
            isHovering = true; // Sinaliza que o mouse está sobre um item
            clearInterval(carouselInterval); // Pausa o intervalo automático

            showImage(index); // Muda a foto imediatamente
        });

        // Mouse SAI (Retoma o carrossel)
        item.addEventListener('mouseleave', () => {
            isHovering = false; // Sinaliza que o mouse saiu
            // Reinicia o carrossel imediatamente após a saída
            startCarousel();
        });
    });

    // --- Inicialização ---

    // Mostra a primeira imagem e inicia a rotação automática
    showImage(currentImageIndex);
    startCarousel();

});