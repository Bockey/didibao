import { removeFromStorage } from "../utils/storage.js";

function removeAdminData() {
  const userKey = "user";
  const tokenKey = "token";
  const doLogout = confirm("Are you sure you want to log out?");
  if (doLogout) {
    removeFromStorage(userKey);
    removeFromStorage(tokenKey);
    location.href = "/";
  }
}

export function logout() {
  const logoutBtn = document.querySelector(".logout-btn");
  logoutBtn.addEventListener("click", removeAdminData);
}
