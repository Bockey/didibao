import { saveToStorage } from "../utils/storage.js";
import { removeFromStorage } from "../utils/storage.js";
import { getFromStorage } from "../utils/storage.js";

let data;

export function removeFromCart() {
  const removeButtons = document.querySelectorAll(".item-text button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      data = getFromStorage("cart");

      const index = parseInt(button.dataset.index);
      if (data.length === 1) {
        data = "";
      } else {
        data.splice(index, 1);
        console.log(index);
      }
      console.log(data);

      removeFromStorage("cart");
      saveToStorage("cart", data);
      window.location.reload();
    });
  });
}
