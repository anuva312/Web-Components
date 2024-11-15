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

// Code for Tree Structure
const data = [
  {
    name: "Node 1",
    id: "0000001",
    children: [
      {
        name: "Node 12",
        id: "0000002",
        children: [
          {
            name: "Node 121",
            id: "0000005",
            children: [{ name: "Node 1211", id: "0000001", children: [] }],
          },
        ],
      },
      {
        name: "Node 13",
        id: "0000003",
        children: [{ name: "Node 131", id: "0000006", children: [] }],
      },
      { name: "Node 14", id: "0000004", children: [] },
    ],
  },
  { name: "Node 2", id: "0000006", children: [] },
];

const treeElement = document.querySelector("uc-tree");
treeElement.data = data;
