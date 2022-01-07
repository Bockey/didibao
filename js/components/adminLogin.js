import { apiUrl } from "../settings/apiUrl.js";
import { displayMessage } from "./displayMessage.js";
import { saveToken } from "../utils/storage.js";
import { saveUser } from "../utils/storage.js";

const closeButton = document.querySelector(".close-button");
const adminLogin = document.querySelector(".admin-login");
const openLink = document.querySelector(".open-login-form");

export function closing() {
  closeButton.onclick = () => {
    adminLogin.classList.add("hide");
  };
}

export function openning() {
  openLink.onclick = () => {
    adminLogin.classList.remove("hide");
  };
}

/* ADMIN LOGIN FORM */

const footerForm = document.querySelector("footer form");
const footerFormBtn = document.querySelector("footer form button");
const footerFormUser = document.querySelector("footer form #username");
const footerFormPass = document.querySelector("footer form #password");
const messageContainer = document.querySelector("footer .message-container");

export function login() {
  footerForm.addEventListener("submit", submitForm);

  function submitForm(event) {
    event.preventDefault();
    messageContainer.innerHTML = "";
    const usernameValue = footerFormUser.value.trim();
    const passwordValue = footerFormPass.value.trim();

    if (usernameValue.length === 0 || passwordValue.length === 0) {
      return displayMessage(
        "warning",
        "Invalid input values",
        messageContainer
      );
    }

    doLogin(usernameValue, passwordValue);
  }
}

async function doLogin(username, password) {
  const loginUrl = apiUrl + "/auth/local";
  const data = JSON.stringify({ identifier: username, password: password });
  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(loginUrl, options);
    const json = await response.json();
    console.log(json);

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);
      location.href = "/admin.html";
    }

    if (json.error) {
      displayMessage(
        "warning",
        "Please enter valid login details",
        messageContainer
      );
    }
  } catch (error) {
    displayMessage(
      "error",
      "We have a problem with our server. Try again later",
      messageContainer
    );
  }
}
