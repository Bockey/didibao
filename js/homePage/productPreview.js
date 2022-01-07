export function productPreview(data) {
  const previewImage = document.querySelector(".product-preview_image");

  let image;

  const index = data.length - 1;
  // if (
  //   (data[index].image !== null && data[index].image_url === "") ||
  //   (data[index].image !== null && data[index].image_url === null)
  // ) {
  //   image = `https://semester-sp2.herokuapp.com${data[index].image.url}`;
  // } else {
  //   image = data[index].image_url;
  // }

  image = data[index].image.url;

  previewImage.innerHTML = `<div style="background-image: url(${image})"></div>`;

  const previewProductId = data[index].id;
  const previewButton = document.querySelector(".product-preview_button a");
  previewButton.href = `/productDetails.html?id=${previewProductId}`;
}
