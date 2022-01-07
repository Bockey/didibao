import { getFromStorage } from "../utils/storage.js";
import { openMenu } from "../components/hamburgerMenu.js";
import { closing } from "../components/adminLogin.js";
import { openning } from "../components/adminLogin.js";
import { login } from "../components/adminLogin.js";
import { cartNr } from "../components/cartNr.js";
import { removeFromCart } from "./removeFromCart.js";

openMenu();
closing();
openning();
login();

let data = getFromStorage("cart");

function createCartHtml() {
  cartNr(data);
  console.log(data);

  const cartItems = document.querySelector(".cart-items");
  let total = 0;

  cartItems.innerHTML = "";
  if (data.length === 0 || data === "") {
    const cartContainer = document.querySelector(".cart-container");
    cartContainer.innerHTML = `<h2 class="empty-cart">Shopping cart is empty</h2>`;
  }
  for (let i = 0; i < data.length; i++) {
    total += parseInt(data[i].value.price);

    cartItems.innerHTML += ` <div class="cart-item">
                                        <div class="item-image" style="background-image:url(${data[i].value.image})"></div>
                                        <div class="item-text">
                                            <h2>${data[i].value.title}</h2>
                                            <p>Color: white</p>
                                            <p>Size: 42</p>
                                            <p>Quantity: 1</p>
                                            <p>NOK${data[i].value.price}</p>
                                            <a href="/productDetails.html?id=${data[i].id}">View product</a>
                                            <button data-index="${i}">Remove</button>
                                        </div>
                                </div>`;
  }
  const cartCheckout = document.querySelector(".cart-checkout");
  if (cartCheckout) {
    cartCheckout.innerHTML = `
                                <p>Total <span>NOK${total}</span></p>
                                <button>Checkout</button>`;
  }
}

createCartHtml();

removeFromCart();
