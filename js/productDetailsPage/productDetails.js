import { openMenu } from "../components/hamburgerMenu.js";
import { closing } from "../components/adminLogin.js";
import { openning } from "../components/adminLogin.js";
import { login } from "../components/adminLogin.js";
import { apiUrl } from "../settings/apiUrl.js";
import { displayMessage } from "../components/displayMessage.js";
import { displayProduct } from "../productDetailsPage/displayProduct.js";
import { recommendedProducts } from "../productDetailsPage/recommendedProducts.js";
import { chooseColor } from "./chooseColor.js";
import { chooseSize } from "./chooseSize.js";
import { addToCart } from "./addToCart.js";

openMenu();
closing();
openning();
login();

/*get id*/

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

/* get product */

(async function () {
  const productUrl = apiUrl + "/products/" + id;
  try {
    const responseProduct = await fetch(productUrl);
    const jsonProduct = await responseProduct.json();

    displayProduct(jsonProduct);

    const buttons = document.querySelectorAll(".product-colors input");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        chooseColor();
      });
    });
    const sizeButtons = document.querySelectorAll(".product-size input");
    sizeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        chooseSize();
      });
    });

    addToCart(jsonProduct);
  } catch (error) {
    const productContainer = document.querySelector(".details-body .product");
    displayMessage("error", error, productContainer);
  }
})();

(async function () {
  const productsUrl = apiUrl + "/products";
  try {
    const responseProducts = await fetch(productsUrl);
    const jsonProducts = await responseProducts.json();

    recommendedProducts(jsonProducts);
  } catch (error) {
    const recommendedProductsContainer = document.querySelector(
      "section.recommended"
    );
    displayMessage("error", error, recommendedProductsContainer);
  }
})();
