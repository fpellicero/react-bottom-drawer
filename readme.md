# React Bottom Drawer

This package contains a single React component that allows you to build mobile-friendly dialogs that slide from the bottom.

While it works on desktop, it is designed as a mobile interaction.

It has 100% typescript support, as it's written in typescript.

## Usage

Using it is pretty straight-forward, just import the component, and place the content as it's children.

```jsx
import React from "react";
import Drawer from "react-bottom-drawer";

function DemoDrawer() {
  const [isVisible, setIsVisible] = React.useState(false);

  const onClose = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <Drawer
      isVisible={isVisible}
      onClose={onClose}
    >
      { ... }
    </Drawer>
  )
}
```

## Props

| Prop           | Type       | Required? | Default Value | Description                                                                                                                               |
| -------------- | ---------- | --------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| isVisible      | `boolean`  | Required  | -             | Shows or hides the modal                                                                                                                  |
| onClose        | `function` | Required  | -             | Invoked when the drawer should be close. You shoud be setting `isVisible` to false in this callback                                       |
| mountOnEnter   | `boolean`  | Optional  | `true`        | If true, the children won't be mounted until `isVisible` is true. If false, we will mount the children, and hide them via CSS.            |
| unmountOnExit  | `boolean`  | Optional  | `true`        | If true, we will unmount the children once `isVisible` goes back to `false`. If false, we won't unmount the children after mounting them. |
| duration       | `number`   | Optional  | `250`         | Duration of the enter / exit animation in ms                                                                                              |
| hideScrollbars | `boolean`  | Optional  | `false`       | If true, scrollbars won't appear even if content is scrollable                                                                            |
| className      | `string`   | Optional  | `undefined`   | For theming. If provided, it will generate classNames for all divs based on the provided value                                            |

## Examples

Click [here](https://codesandbox.io/s/blissful-architecture-kuci5) to see some examples on codesandbox.

## Theming

You can provide custom styles by providing a custom `className` prop. You can use them to add styling to
the drawer. If you need to override some values, you probably need to use `!important`.

These are all the available `classNames`:
```css

.drawer {

}

.drawer__backdrop {

}

.drawer__handle-wrapper {

}

.drawer__handle {

}

.drawer__content {

}

```
