export function displayProduct(data) {
  const productContainer = document.querySelector(".details-body .product");
  productContainer.innerHTML = "";
  if (data) {
    let image;
    // if (
    //   (data.image !== null && data.image_url === "") ||
    //   (data.image !== null && data.image_url === null)
    // ) {
    //   //if the product have an image on strapi

    //   image = `https://semester-sp2.herokuapp.com${data.image.url}`;
    // } else {
    //   image = data.image_url; // if it has an image as url link
    // }
    image = data.image.url;
    productContainer.innerHTML += `<div class="product-images">
                                        <div class="product-image" style="background-image:url(${image})">

                                        </div>
                                        </div>
                                        <div class="product-about">
                                            <h1>${data.title}</h1>
                                            <p>NOK${data.price}</p>
                                            <div class="product-colors">
                                                <label for="colors-white"></label>
                                                <input type="radio" value="white" name="colors" id="colors-white">
                                                <label for="colors-black"></label>
                                                <input type="radio" value="black" name="colors" id="colors-black">
                                                <label for="colors-yellow"></label>
                                                <input type="radio" value="yellow" name="colors" id="colors-yellow">
                                                <label for="colors-green"></label>
                                                <input type="radio" value="green" name="colors" id="colors-green">
                                                <label for="colors-red"></label>
                                                <input type="radio" value="red" name="colors" id="colors-red">
                                            </div>
                                            <div class="product-size">
                                                <label for="size-forty">40</label>
                                                <input type="radio" value="forty" name="size" id="size-forty">
                                                <label for="size-forty-one">41</label>
                                                <input type="radio" value="forty-one" name="size" id="size-forty-one">
                                                <label for="size-forty-two">42</label>
                                                <input type="radio" value="forty-two" name="size" id="size-forty-two">
                                                <label for="size-forty-three">43</label>
                                                <input type="radio" value="forty-three" name="size" id="size-forty-three">
                                                <label for="size-forty-four">44</label>
                                                <input type="radio" value="forty-four" name="size" id="size-forty-four">
                                                <label for="size-forty-five">45</label>
                                                <input type="radio" value="forty-five" name="size" id="size-forty-five">
                                                <label for="size-forty-six">46</label>
                                                <input type="radio" value="forty-six" name="size" id="size-forty-six">
                                                <label for="size-forty-seven">47</label>
                                                <input type="radio" value="forty-seven" name="size" id="size-forty-seven">
                                            </div>
                                            <div class="buttons-container">
                                                <button class="add-to-cart">Add to cart</button>
                                                <button class="remove-from-cart" style="display:none">Remove from cart</button>
                                            </div>
                                            <div class="product-description">
                                                <h2>Product details</h2>
                                                <p>${data.description}</p>
                                            </div>
                                    </div>`;
  }

  const recommendedHeader = document.querySelector(".recommended-header");
  recommendedHeader.textContent = "you may also like";
}
