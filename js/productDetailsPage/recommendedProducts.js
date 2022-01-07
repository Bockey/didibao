export function recommendedProducts(data) {
  const recommendedProductsContainer = document.querySelector(
    "section.recommended"
  );

  for (let i = 0; i < 2; i++) {
    if (data[i]) {
      let image;
      if (
        (data[i].image !== null && data[i].image_url === "") ||
        (data[i].image !== null && data[i].image_url === null)
      ) {
        //if the product have an image on strapi

        image = `https://semester-sp2.herokuapp.com${data[i].image.url}`;
      } else {
        image = data[i].image_url; // if it has an image as url link
      }

      recommendedProductsContainer.innerHTML += `<a href="/productDetails.html?id=${data[i].id}" class="recommended-product">
                                                        <div class="recommended-product-image" style="background-image:url(${image})">

                                                        </div>
                                                        <h3>${data[i].title}</h3>
                                                        <p>NOK${data[i].price}</p>
                                                    </a>`;
    }
  }
}
