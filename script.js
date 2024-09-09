const modalElement = document.querySelector("uc-modal");
const onButtonClick = function () {
  if (modalElement && !modalElement.isModalOpen) {
    modalElement.open();
  }
};
if (modalElement) {
  modalElement.addEventListener("confirm", () => {
    console.log("Modal closed, confirm");
  });
  modalElement.addEventListener("cancel", () => {
    console.log("Modal closed, cancel");
  });
}
