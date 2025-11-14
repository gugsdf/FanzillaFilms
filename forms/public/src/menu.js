const menu = document.getElementById("barra-menu");
const menuItems = document.getElementsByClassName("tela-menu")[0];

function toggleMenu() {
    menuItems.classList.toggle("mostrar-menu");
}

// Mostrar/ocultar ao clicar no menu
menu.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
});

document.addEventListener("click", (event) => {
    const isClickInsideMenu = menu.contains(event.target) || menuItems.contains(event.target);
    if (!isClickInsideMenu) {
        menuItems.classList.remove("mostrar-menu");
    }
});