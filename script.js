// Code for Modal
const modalElement = document.querySelector("uc-modal");
const onModalOpenButtonClick = function () {
  if (modalElement && !modalElement.isModalOpen) {
    modalElement.open();
  }
};
if (modalElement) {
  modalElement.addEventListener("confirm", () => {
    console.log("Confirm clicked, closing modal");
  });
  modalElement.addEventListener("cancel", () => {
    console.log("Canceled, closing modal");
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
        name: "Node 1-2",
        id: "0000002",
        children: [
          {
            name: "Node 1-2-1",
            id: "0000005",
            children: [
              {
                name: "Node 1-2-1-1",
                id: "0000001",
                children: [],
                disabled: true,
              },
            ],
          },
        ],
      },
      {
        name: "Node 1-3",
        id: "0000003",
        children: [
          { name: "Node 1-3-1", id: "0000006", children: [], disabled: true },
        ],
      },
      { name: "Node 1-4", id: "0000004", children: [] },
    ],
  },
  { name: "Node 2", id: "0000006", children: [] },
];

const treeElement = document.querySelector("uc-tree");
treeElement.data = data;

treeElement.addEventListener("node-click", (event) => {
  console.log("Node Clicked", event.detail);
});

const onTreeSetSelectedButtonClick = function () {
  treeElement.setSelected("0000005");
};

const onTreeClearSelectedButtonClick = function () {
  treeElement.clearSelected();
};

const onTreeGetSelectedButtonClick = function () {
  const selected = treeElement.getSelected();
  console.log("Selected node: ", selected);
  alert(`The selected node is ${selected?.name ?? ""}`);
};
