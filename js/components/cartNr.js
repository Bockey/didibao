const cartValue = document.querySelector(".header-icons i span");

export function cartNr(productList) {
  if (productList) {
    cartValue.textContent = productList.length;
  }
}
