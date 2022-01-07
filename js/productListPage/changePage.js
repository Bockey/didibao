import { displayProducts } from "./displayProducts.js";

export function changePage(data) {
  let counter = 0;

  displayProducts(data, counter);
  const buttons = document.querySelectorAll(".pagination-container button");

  /* This adds active class on pagination buttons. button[0] is for top one and other one is for bottom pagination */
  let index = buttons.length / 2;
  buttons[0].classList.add("active");
  buttons[index].classList.add("active");

  buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
      //click adds active class to that btn and the same btn in other pagination
      let activeButton = event.target;
      buttons.forEach((button) => {
        button.classList.remove("active");
        if (button.textContent === activeButton.textContent) {
          button.classList.add("active");
        }
      });

      event.target.classList.add("active");
      counter = button.dataset.counter - 12;
      displayProducts(data, counter);
      location.href = "/productList.html#top"; // after click on th btn page scroll to the top of product list
    });
  });
}
