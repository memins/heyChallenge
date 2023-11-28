const checkbox = document.getElementById("checkbox");
const myCheckbox = document.querySelector(".my-checkbox");
myCheckbox.addEventListener("click", () => {
  checkbox.checked = !checkbox.checked;
});
