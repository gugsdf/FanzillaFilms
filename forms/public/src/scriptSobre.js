document.addEventListener('DOMContentLoaded', () => {
    // 1. Mapeamento das IDs dos links para os caminhos das imagens
    //    *** SUBSTITUA AQUI PELOS SEUS CAMINHOS DE IMAGEM ***
    const imageMap = {
        'link-nova-york': '/img/imgsobre/EUA.avif',
        'link-rio-janeiro': '/img/imgsobre/cristo.jpg',
        'link-lisboa': '/img/imgsobre/lisboa.jpg',
        'link-buenos-aires': '/img/imgsobre/buenos.jpg',
        'link-copenhague': '/img/imgsobre/copenhague.jpg',
        'link-kyoto': '/img/imgsobre/kyoto.jpg',
        'link-reykjavik': '/img/imgsobre/reykjavik.avif',
        'link-toronto': '/img/imgsobre/toronto.jpg'
    };
    
    // 2. Elementos principais
    const fotoViagem = document.getElementById('foto-viagem');
    const links = document.querySelectorAll('.lugares-conteudo a');
    
    // Caminho da imagem padrão para o reset
    const defaultSrc = fotoViagem.src;

    // 3. Função para trocar a imagem com fade
    function changeImageWithFade(newSrc) {
        // 3.1. Aplica o fade-out e inicia a transição
        fotoViagem.classList.add('foto-fade-out');
        
        // 3.2. Após o tempo de transição (400ms do CSS), muda a imagem e faz o fade-in
        setTimeout(() => {
            fotoViagem.src = newSrc;
            
            // Remove a classe de fade-out para iniciar o fade-in
            // Isso deve ser feito DEPOIS da imagem ser alterada, garantindo o efeito.
            fotoViagem.classList.remove('foto-fade-out');
        }, 400); // Deve ser igual ao tempo de transição definido no CSS (0.4s)
    }

    // 4. Adiciona listeners de evento a todos os links
    links.forEach(link => {
        // Evento mouseover (quando o mouse ENTRA no link)
        link.addEventListener('mouseover', (event) => {
            const linkId = event.currentTarget.id;
            const newImageSrc = imageMap[linkId];
            
            if (newImageSrc) {
                changeImageWithFade(newImageSrc);
            }
        });

        // Evento mouseout (quando o mouse SAI do link)
        link.addEventListener('mouseout', () => {
            // Retorna à imagem padrão
            changeImageWithFade(defaultSrc);
        });
    });
});