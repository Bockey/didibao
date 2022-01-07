export function openMenu() {
  const menuButton = document.querySelector(".header-icons_menu");
  const menu = document.querySelector("header nav");

  menuButton.addEventListener("click", function () {
    menu.classList.toggle("show");
  });
}
