// Code for Modal
const modalElement = document.querySelector("uc-modal");
const onModalOpenButtonClick = function () {
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

// Code for Drawer
const drawerElement = document.querySelector("uc-drawer");
const onDrawerOpenButtonClick = function (position) {
  if (drawerElement && !drawerElement.isDrawerOpen) {
    drawerElement.setAttribute("position", position);
    drawerElement.open();
  }
};
