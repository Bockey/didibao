import { removeFromCart } from "../cartPage/removeFromCart.js";
import { cartNr } from "../components/cartNr.js";
import { saveToStorage } from "../utils/storage.js";
import { getFromStorage } from "../utils/storage.js";

export function addToCart(product) {
  const addBtn = document.querySelector(".add-to-cart");
  const buttonsContainer = document.querySelector(".buttons-container");

  let productList = getFromStorage("cart");

  if (productList) {
    cartNr(productList);
  } else {
    productList = [];
  }

  const title = product.title;
  const price = product.price;
  let image;
  // if (
  //   (product.image !== null && product.image_url === "") ||
  //   (product.image !== null && product.image_url === null)
  // ) {
  //   //if the product have an image on strapi

  //   image = `https://semester-sp2.herokuapp.com${product.image.url}`;
  // } else {
  //   image = product.image_url; // if it has an image as url link
  // }
  image = product.image.url;

  const id = product.id;

  addBtn.addEventListener("click", () => {
    const productValue = {
      id: id,
      value: { title: title, price: price, image: image },
    };
    productList.push(productValue);

    cartNr(productList);
    saveToStorage("cart", productList);

    removeBtn.style.display = "block";
    addBtn.style.display = "none";
  });
  const removeBtn = document.querySelector(".remove-from-cart");

  removeBtn.addEventListener("click", () => {
    productList.pop();
    cartNr(productList);
    saveToStorage("cart", productList);

    removeBtn.style.display = "none";
    addBtn.style.display = "block";
  });
}
