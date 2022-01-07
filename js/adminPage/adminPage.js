import { getUsername } from "../utils/storage.js";
import { currentProductsList } from "./currentProductsList.js";
import { apiUrl } from "../settings/apiUrl.js";
import { editProduct } from "./editProduct.js";
import { addProduct } from "./addProduct.js";
import { logout } from "./logout.js";
import { getToken } from "../utils/storage.js";
import { displayMessage } from "../components/displayMessage.js";

/* This protects the route if user is not logged in */

const token = getToken();
if (!token) {
  location.href = "/index.html";
}

/* This adds user name to the header */

const adminWelcomeMsg = document.querySelector(".admin-welcome");
let username = getUsername();
adminWelcomeMsg.textContent = `${username}`;
adminWelcomeMsg.style.textTransform = "capitalize";

const productsUrl = apiUrl + "/products";
(async function () {
  try {
    const response = await fetch(productsUrl);
    const json = await response.json();
    console.log(json);
    currentProductsList(json);
    editProduct(json);
    addProduct(json);
  } catch (error) {
    const body = document.querySelector(".admin-body");
    console.log(error);
    displayMessage(
      "Warning",
      "Restart you computer. If this doesn't help call your developer :-)",
      body
    );
  }
})();

logout();
