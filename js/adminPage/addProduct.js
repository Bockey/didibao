import { displayMessage } from "../components/displayMessage.js";
import { apiUrl } from "../settings/apiUrl.js";
import { getToken } from "../utils/storage.js";

const messageContainer = document.querySelector(".message-container-add");
const name = document.querySelector("#add-name_input");
const price = document.querySelector("#add-price_input");
const description = document.querySelector("#add-description_input");
const featuredYes = document.querySelector("#add-featured_yes");
const featuredNo = document.querySelector("#add-featured_no");
const addForm = document.querySelector(".add-form");
const imageUrl = document.querySelector("#add-image-url");

export function addProduct(json) {
  addForm.addEventListener("submit", saveChanges);
}

/*This function takes values from inputs and put them as parameters in another function*/

function saveChanges(event) {
  event.preventDefault();

  const nameValue = name.value.trim();
  const descriptionValue = description.value.trim();
  const priceValue = price.value.trim();
  const imageUrlValue = imageUrl.value.trim();

  let featuredChecked;
  if (featuredYes.checked) {
    featuredChecked = true;
  } else if (featuredNo.checked) {
    featuredChecked = false;
  }

  if (
    nameValue.length === 0 ||
    descriptionValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue)
    // ||
    // imageUrlValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "Please enter proper values. One or more fields have an error.",
      messageContainer
    );
  }

  uploadProduct(
    nameValue,
    priceValue,
    descriptionValue,
    featuredChecked,
    imageUrlValue
  );
}

/* This function send request to strapi with  values of the product */

async function uploadProduct(name, price, description, featured, imageURL) {
  const url = apiUrl + "/products";
  const data = JSON.stringify({
    title: name,
    price: price,
    description: description,
    featured: featured,
    image_url: imageURL,
  });
  const token = getToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.updated_at) {
      displayMessage(
        "success",
        "Successfuly added product. <br>Please refresh the page to see your changes.",
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
    console.log(error);
  }
}
