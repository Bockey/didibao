import { apiUrl } from "../settings/apiUrl.js";
import { displayMessage } from "../components/displayMessage.js";
import { openMenu } from "../components/hamburgerMenu.js";
import { closing } from "../components/adminLogin.js";
import { openning } from "../components/adminLogin.js";
import { login } from "../components/adminLogin.js";
import { productsNumber } from "./productsNumber.js";
import { pagination } from "./pagination.js";
import { changePage } from "./changePage.js";
import { getFromStorage } from "../utils/storage.js";
import { cartNr } from "../components/cartNr.js";

(async function () {
  const productContainer = document.querySelector(".productList-container");
  const productsUrl = apiUrl + "/products";
  try {
    const responseProducts = await fetch(productsUrl);
    const jsonProducts = await responseProducts.json();
    console.log(jsonProducts);

    /* Cart nr of items */

    const productList = getFromStorage("cart");
    cartNr(productList);

    /* Search products results */

    const searchInput = document.querySelector("#search");
    let products = jsonProducts;
    searchInput.onkeyup = function (event) {
      const searchValue = event.target.value.trim().toLowerCase();
      let filteredProducts = jsonProducts.filter((product) => {
        if (
          product.title.toLowerCase().includes(searchValue) ||
          product.description.toLowerCase().includes(searchValue)
        ) {
          return true;
        }
      });
      products = filteredProducts;

      productsNumber(products);
      pagination(products);
      changePage(products);
    };
    productsNumber(products);
    pagination(products);
    changePage(products);
  } catch (error) {
    displayMessage("error", error, productContainer);
    console.log(error);
  }
})();

openMenu();
closing();
openning();
login();
