// Code for Modal
const modalElement = document.querySelector("uc-modal");
const confirmButtonLabelElement = document.querySelector(
  "#confirm-button-label-input"
);
const cancelButtonLabelElement = document.querySelector(
  "#cancel-button-label-input"
);
const checkboxElement = document.querySelector(
  `.modal-controls.hide-cancel-button input[type="checkbox"]`
);
const onModalOpenButtonClick = function () {
  const confirmLabel = confirmButtonLabelElement?.value;
  const cancelLabel = cancelButtonLabelElement?.value;
  const hideCancelButton = checkboxElement?.checked;

  if (modalElement && !modalElement.isModalOpen) {
    const attributeObj = {
      "confirm-button-label": confirmLabel,
      "cancel-button-label": cancelLabel,
      "hide-cancel-button": hideCancelButton,
    };
    updateModalAttributes(attributeObj);
    modalElement.open();
  }
};

const updateModalAttributes = function (attributeObj) {
  if (modalElement && attributeObj) {
    for (const key in attributeObj) {
      if (key === "hide-cancel-button") {
        if (!attributeObj[key]) {
          modalElement.removeAttribute(key);
        } else {
          modalElement.setAttribute(key, "");
        }
      } else {
        modalElement.setAttribute(key, attributeObj[key]);
      }
    }
  }
};

const resetModalAttributes = function () {
  const modalAttributes = [
    "confirm-button-label",
    "cancel-button-label",
    "hide-cancel-button",
  ];
  if (modalElement) {
    for (const attribute of modalAttributes) {
      modalElement.removeAttribute(attribute);
    }
  }
};

const onResetControlsButtonClick = function () {
  confirmButtonLabelElement.value = "";
  cancelButtonLabelElement.value = "";
  checkboxElement.checked = false;
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

// For tree component that is selectable

const treeElement = document.querySelector("uc-tree#selectable-tree");
treeElement.data = data;

treeElement.addEventListener("node-click", (event) => {
  console.log("Node Clicked", event.detail);
});

// For tree component that is not selectable

const treeElementUnSelectable = document.querySelector(
  "uc-tree#un-selectable-tree"
);
treeElementUnSelectable.data = data;

treeElementUnSelectable.addEventListener("node-click", (event) => {
  console.log("Node Clicked", event.detail);
});

// Common click events

const onTreeSetSelectedButtonClick = function (type) {
  if (type === "selectable") {
    treeElement.setSelected("0000005");
  } else {
    treeElementUnSelectable.setSelected("0000005");
  }
};

const onTreeClearSelectedButtonClick = function (type) {
  if (type === "selectable") {
    treeElement.clearSelected();
  } else {
    treeElementUnSelectable.clearSelected();
  }
};

const onTreeGetSelectedButtonClick = function (type) {
  let selected = null;
  if (type === "selectable") {
    selected = treeElement.getSelected();
  } else {
    selected = treeElementUnSelectable.getSelected();
  }
  console.log("Selected node: ", selected);
};
