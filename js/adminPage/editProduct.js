import { displayMessage } from "../components/displayMessage.js";
import { apiUrl } from "../settings/apiUrl.js";
import { getToken } from "../utils/storage.js";

const messageContainer = document.querySelector(".message-container");
const loadButton = document.querySelector(".load-button");
const id = document.querySelector("#edit-id-input");
const name = document.querySelector("#edit-name_input");
const price = document.querySelector("#edit-price_input");
const description = document.querySelector("#edit-description_input");
const images = document.querySelector(".edit-images");
const featuredYes = document.querySelector("#edit-featured_yes");
const featuredNo = document.querySelector("#edit-featured_no");
const editForm = document.querySelector(".edit-form");
const uploadImageInput = document.querySelector("#upload-image_input");
const uploadImageForm = document.querySelector(".upload-image");
const editFormHeader = document.querySelector(".edit-form-header");
const addFormHeader = document.querySelector(".add-form-header");
const addForm = document.querySelector(".add-form");
const deleteBtn = document.querySelector(".delete-button");

const imageUrl = document.querySelector("#image-url");

export function editProduct(json) {
  openForm(editFormHeader, editForm);
  openForm(addFormHeader, addForm);

  loadButton.addEventListener("click", function () {
    loadProduct(json);
  });
  deleteBtn.addEventListener("click", deleteProduct);

  editForm.addEventListener("submit", saveChanges);

  uploadImageForm.addEventListener("submit", uploadingImage);
}

/*This function loads product in edit form based on entered id*/

function loadProduct(data) {
  console.log(id.value.trim());

  for (let i = 0; i < data.length; i++) {
    if (id.value.trim() == data[i].id) {
      name.value = data[i].title;
      price.value = data[i].price;
      description.value = data[i].description;
      if (data[i].featured === true) {
        featuredYes.checked = true;
      } else {
        featuredNo.checked = true;
      }
      if (data[i].image.url) {
        images.innerHTML = `<div class="edit-image" style="background-image: url(${data[i].image.url})"></div>`;
      } else if (data[i].image_url !== "") {
        images.innerHTML = `<div class="edit-image" style="background-image: url(${data[i].image_url})"></div>`;
      } else {
        images.innerHTML = "No images of this product";
      }
    }
  }
}

/*This function delete product in edit form based on entered id*/

async function deleteProduct() {
  const doDelete = confirm("Are you sure you want to delete this product?");

  if (doDelete) {
    const idValue = id.value;
    const url = apiUrl + "/products/" + idValue;
    const data = JSON.stringify({ id: idValue });
    const token = getToken();

    const options = {
      method: "DELETE",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const json = await response.json();

      location.reload();
    } catch (error) {
      displayMessage(
        "error",
        "Something went wrong. Try again later",
        messageContainer
      );
    }
  }
}

/*This function takes values from inputs and put them as parameters in another function*/

function saveChanges(event) {
  event.preventDefault();

  const idValue = id.value.trim();
  const nameValue = name.value.trim();
  const descriptionValue = description.value.trim();
  const priceValue = price.value.trim();

  // const imageUrlValue = imageUrl.value.trim();

  let featuredChecked;
  if (featuredYes.checked) {
    featuredChecked = true;
  } else if (featuredNo.checked) {
    featuredChecked = false;
  }

  if (
    idValue.length === 0 ||
    nameValue.length === 0 ||
    descriptionValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue)
    // imageUrlValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "Please enter proper values",
      messageContainer
    );
  }

  updateProduct(
    idValue,
    nameValue,
    priceValue,
    descriptionValue,
    featuredChecked
  );
}

/* This function send request to strapi with new values of the product */

async function updateProduct(id, name, price, description, featured) {
  const url = apiUrl + "/products/" + id;
  const data = JSON.stringify({
    title: name,
    price: price,
    description: description,
    featured: featured,
  });
  const token = getToken();
  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (json.updatedAt) {
      displayMessage(
        "success",
        "Successfuly updated. <br>Please refresh the page to see your changes.",
        messageContainer
      );
    }
    if (json.error) {
      displayMessage("error", json.error, messageContainer);
    }
  } catch (error) {
    displayMessage(
      "error",
      "Something went wrong. Try again later",
      messageContainer
    );
  }
}

/* This function send request to strapi to upload new image */

async function uploadingImage(event) {
  event.preventDefault();

  const container = document.querySelector(".message-container-img-upload");

  const uploadImageInputValue = uploadImageInput.files[0];
  let imageData = new FormData();
  imageData.append("files", uploadImageInputValue);
  const imageAddUrl = apiUrl + "/upload";
  const token = getToken();

  const imageOptions = {
    method: "POST",
    body: imageData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const imageResponse = await fetch(imageAddUrl, imageOptions);
    const imageJson = await imageResponse.json();
    console.log(imageJson);
    console.log(imageJson[0].id);
    if (imageJson[0].id) {
      displayMessage("success", "Successfuly uploaded", container);
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", "Something went wrong", container);
  }
}

/* This function open form with click on the header of that form */

function openForm(header, form) {
  header.addEventListener("click", () => {
    form.classList.toggle("hide-important");
  });
}
