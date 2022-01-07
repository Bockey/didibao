export function pagination(data) {
  const paginationContainer = document.querySelectorAll(
    ".pagination-container"
  );
  let pages = Math.ceil(data.length / 12);

  paginationContainer.forEach((container) => {
    container.innerHTML = "";
    for (let i = 1; i <= pages; i++) {
      let counter = i * 12;
      container.innerHTML += `<button data-counter="${counter}">${i}</button>`;
    }
  });
}
