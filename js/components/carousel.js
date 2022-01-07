export function carouselHtml(data) {
  const slider = document.querySelector(".carousel");
  const innerSlider = document.querySelector(".carousel_track");

  for (let i = 0; i < data.length; i++) {
    let image;
    // if (
    //   (data[i].image !== null && data[i].image_url === "") ||
    //   (data[i].image !== null && data[i].image_url === null)
    // ) {
    //   image = `https://semester-sp2.herokuapp.com${data[i].image.url}`;
    // } else {
    //   image = data[i].image_url;
    // }
    image = data[i].image.url;
    if (data[i].featured && image) {
      innerSlider.innerHTML += `<div class="carousel_product">
                                        <div class="carousel_image-container" style="background-image:url(${image})">
                                        </div>  
                                        <h3>${data[i].title}</h3>
                                        <span>Mens shoes</span>
                                        <p>NOK${data[i].price}</p>
                                        <a href="/productDetails.html?id=${data[i].id}">See product</a>
                                    </div>`;
    } else if (data[i].featured && !image) {
      innerSlider.innerHTML += `<div href="/cart.html" class="carousel_product">
                                        <div class="carousel_image-container" >
                                        Photos coming soon
                                        </div>  
                                        <h3>${data[i].title}</h3>
                                        <span>Mens shoes</span>
                                        <p>NOK${data[i].price}</p>
                                        <a href="/productDetails.html?id=${data[i].id}">See product</a>
                                    </div>`;
    }
  }
}

export function slideCarousel() {
  /* carousel slide function */

  const slider = document.querySelector(".carousel");
  const innerSlider = document.querySelector(".carousel_track");

  let positionX;
  let pressed = false;
  let x;

  slider.addEventListener("mousedown", (e) => {
    pressed = true;
    positionX = e.offsetX - innerSlider.offsetLeft;
    slider.style.cursor = "grabbing";
  });

  window.addEventListener("mouseup", () => {
    pressed = false;
  });

  slider.addEventListener("mousemove", (e) => {
    if (!pressed) return;
    e.preventDefault();
    x = e.offsetX;
    innerSlider.style.left = `${x - positionX}px`;

    checkBoundary();
  });

  function checkBoundary() {
    let outer = slider.getBoundingClientRect();
    let inner = innerSlider.getBoundingClientRect();

    if (parseInt(innerSlider.style.left) > 0) {
      innerSlider.style.left = "0px";
    } else if (inner.right < outer.right) {
      innerSlider.style.left = `-${inner.width - outer.width}px`;
    }
  }

  /* touch screens */

  slider.addEventListener("touchstart", (e) => {
    pressed = true;
    positionX = e.touches[0].clientX - innerSlider.offsetLeft;
  });
  window.addEventListener("touchend", () => {
    pressed = false;
  });

  slider.addEventListener("touchmove", (e) => {
    if (!pressed) return;
    e.preventDefault();
    x = e.touches[0].clientX;
    innerSlider.style.left = `${x - positionX}px`;

    checkBoundary();
  });
}
