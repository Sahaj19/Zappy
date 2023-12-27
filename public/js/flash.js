let cross_btn = document.querySelector(".flash_message_cross_btn");
let flash_div = document.querySelector(".flash_message_div");

cross_btn.addEventListener("click", () => {
  flash_div.classList.add("remove");
});
