import { apiUrl } from "./settings/apiUrl.js";
import { displayMessage } from "./components/displayMessage.js";
import { carouselHtml } from "./components/carousel.js";
import { slideCarousel } from "./components/carousel.js";
import { productPreview } from "./homePage/productPreview.js";
import { openMenu } from "./components/hamburgerMenu.js";
import { closing } from "./components/adminLogin.js";
import { openning } from "./components/adminLogin.js";
import { login } from "./components/adminLogin.js";
import { getFromStorage } from "./utils/storage.js";
import { cartNr } from "./components/cartNr.js";

const productsUrl = apiUrl + "/products";
const heroBanner = apiUrl + "/hero-banner";
const landingSection = document.querySelector(".landing-section");
const slider = document.querySelector(".carousel");
const previewImage = document.querySelector(".product-preview_image");

(async function () {
  try {
    const responseHero = await fetch(heroBanner);
    const jsonHero = await responseHero.json();

    landingSection.style.backgroundImage = `url(${jsonHero.image.url})`;

    const responseProducts = await fetch(productsUrl);
    const jsonProducts = await responseProducts.json();
    carouselHtml(jsonProducts);
    productPreview(jsonProducts);

    //  /* Cart nr of items */

    const productList = getFromStorage("cart");
    cartNr(productList);
  } catch (error) {
    const errorHtml = `<div class="fetchError"><h2>Something went wrong.</h2><br><span>${error}</span></div>`;
    landingSection.style.backgroundColor = "black";
    slider.innerHTML = errorHtml;
    previewImage.innerHTML = errorHtml;
  }
})();

openMenu();
slideCarousel();
closing();
openning();
login();
