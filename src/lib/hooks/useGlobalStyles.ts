import React from "react";

function useGlobalStyles(styles: string) {
  React.useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    const stylesSetted = document.querySelectorAll("style[data-react-bottom-drawer").length > 0;

    if (stylesSetted) {
      return;
    }

    const tag = document.createElement("style");
    tag.setAttribute("data-react-bottom-drawer", "");
    tag.innerHTML = styles;

    document.head.appendChild(tag);
  }, []);
}

export default useGlobalStyles;
