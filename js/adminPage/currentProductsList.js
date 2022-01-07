/* Gives a list of all products available at the moment */

const productsList = document.querySelector(".admin ol");

export function currentProductsList(data) {
  for (let i = 0; i < data.length; i++) {
    let featured = "";
    if (data[i].featured === true) {
      featured = ", Featured";
    }
    productsList.innerHTML += `<li>ID = ${data[i].id}, ${data[i].title}, price NOK${data[i].price} ${featured}</li>`;
  }
}
