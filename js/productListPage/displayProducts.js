export function displayProducts(data, counter) {
  const productContainer = document.querySelector(".productList-container");

  productContainer.innerHTML = "";

  for (let i = counter; i < counter + 12; i++) {
    //for products from/to. It starts from 0 to 12. In changePage() click on the btn adds 12 on the counter for next 12 products
    if (data[i]) {
      let image;
      // if (
      //   (data[i].image !== null && data[i].image_url === "") ||
      //   (data[i].image !== null && data[i].image_url === null)
      // ) {
      //   //if the product have an image on strapi
      //   image = `https://semester-sp2.herokuapp.com${data[i].image.url}`;
      // } else {
      //   image = data[i].image_url; // if it has an image as url link
      // }
      image = data[i].image.url;
      productContainer.innerHTML += `<a href="/productDetails.html?id=${data[i].id}" class="product-list-card">
                                                <div class="product-list-card_image" style="background-image:url(${image})"></div>
                                                <h2>${data[i].title}</h2>
                                                <p>NOK${data[i].price}</p>
                                            </a>`;
    }
  }
}
