# Web Components

The Web Components I made for learning!

You can find the components in action [here](https://anuva312.github.io/Web-Components/).

## Components

1. [Modal](#modal-component)
2. [Drawer](#drawer-component)
3. [Tree](#tree-component)

## Modal Component

Contains a modal element with a header, content along with confirm and cancel buttons.

Once the modal is opened a backdrop (blurred background) will be added behind it. Clicking on it will close the modal.

### HTML Tag

`<uc-modal>`

### Slots

- modal-header

  The heading/title of the modal.

- Default slot
  Anything else will go inside the default slot which is the content of the modal.

### Attributes

- opened

  Its presence determines whether the modal is opened or closed.

### Events Fired

- confirm

  Fired when user clicks on the confirm button. Will also close the modal.

- cancel

  Fired when user clicks on the cancel button. Will also close the modal. Clicking on the backdrop will also fire the cancel button and close the modal.

### Methods Supported

- open

  Opens the modal.

- close

  Closes the modal.

## Drawer Component

A drawer with fixed positioning that can slide in from either top, right, bottom or left.

Once the drawer is opened a backdrop (blurred background) will be added behind it. Clicking on it will close the drawer.

### HTML Tag

`<uc-drawer>`

### Slots

- Default slot: Anything inside the opening and closing `<uc-drawer>` will go inside the default slot.

### Attributes

- opened

  Its presence determines whether the drawer is opened or closed.

- position

  Determines from where the drawer will slide in from once it's opened. Possible values are:

  - top
  - right
  - bottom
  - left

### Events Fired

None

### Methods Supported

- open

  Opens the drawer.

- close

  Closes the drawer.

## Tree Component

A component that can display data provided to it in a hierarchical tree structure.

### HTML Tag

`<uc-tree>`

### Slots

None

### Attributes

- selectable

  Determines whether the individual node items are selectable either by clicking or using methods provided by the component.

### Properties

- data

  The data used to populate the tree. Should be a list of objects of the form:

  ```
  [
      {
          name: "Node 1",
          id: "00001",
          children: [
              ...
          ],
          disabled: true,
      },
      ...
  ]
  ```

  - name : The name of the node. This will be the name displayed in the strucutre. Required attribute.
  - id: Used to uniquely identify a node. Used for selection. Required attribute.
  - children: A list of object of the same structure. Used to develop the hierarchical structure of the tree. Required attribute.
  - disabled: Whether or not the particular node is clickable. Only applicable if `selectable` attribute is set. Is optional.

### Events Fired

- node-click

  The event fired when user clicks on the node in the tree strcuture. Returns the `event` argument. The selected node object can be found in `event.details`.

### Methods Supported

- setSelected(nodeId)

  Takes the _nodeId_ (the `id` property in the data) and sets it as the selected node. If `selectable` attribute is not set, results in a warning in the console saying _The nodes are not selectable_.

- getSelected

  Returns the currently selected node object. If `selectable` attribute is not set, results in a warning in the console saying _The nodes are not selectable_ and returns null.

- clearSelected

  Clears the current selection if any. If `selectable` attribute is not set, results in a warning in the console saying _The nodes are not selectable_.
