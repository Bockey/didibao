export function chooseColor() {
  const button = document.querySelector(".product-colors input:checked");

  const labels = document.querySelectorAll(".product-colors label");
  labels.forEach((label) => {
    label.style.border = "none";
    if (button.id === label.htmlFor) {
      label.style.border = "3px solid gray";
    }
  });
}
