const modalbg = document.getElementById("modal-bg");
const modalSwitch = document.getElementById("modal-switch");
const modalBox = document.getElementById("modal-box");
const modalClose = document.getElementById("modal-close");
modalbg.addEventListener("click", function () {
  modalBox.classList.add("hidden");
  modalbg.classList.add("hidden");
});
modalSwitch.addEventListener("click", function () {
  modalBox.classList.remove("hidden");
  modalbg.classList.remove("hidden");
});
modalClose.addEventListener("click", function () {
  modalBox.classList.remove("hidden");
  modalbg.classList.remove("hidden");
});
