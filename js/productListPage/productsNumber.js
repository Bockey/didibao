/* This shows total nr of products on the page */

export function productsNumber(data) {
  const productsNr = document.querySelectorAll(".nr-of-products");
  productsNr.forEach((nr) => {
    nr.textContent = `${data.length} Items`;
  });
}
