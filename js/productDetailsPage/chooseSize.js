export function chooseSize() {
  const button = document.querySelector(".product-size input:checked");

  const labels = document.querySelectorAll(".product-size label");
  labels.forEach((label) => {
    label.style.border = "1px solid black";
    label.style.backgroundColor = "unset";
    label.style.color = "unset";
    if (button.id === label.htmlFor) {
      label.style.border = "1px solid black";
      label.style.backgroundColor = "black";
      label.style.color = "white";
    }
  });
}
