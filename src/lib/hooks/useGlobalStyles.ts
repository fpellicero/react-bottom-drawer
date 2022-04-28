import React from "react";
import globalStylesheet, { getClassNames } from "../styles";

function useGlobalStyles(duration: number, hideScrollbars: boolean, maxHeight: number) {
  const identifier = React.useMemo(() => Math.random().toString(36).substr(2), []);
  const classNames = React.useMemo(() => getClassNames(identifier), [identifier]);
  
  React.useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    const styles = globalStylesheet(identifier, {duration, hideScrollbars, maxHeight});

    const tag = document.createElement("style");
    tag.setAttribute("data-react-bottom-drawer", identifier);
    tag.innerHTML = styles;

    document.head.appendChild(tag);

    return function() {
      const stylesheet = document.querySelector(`style[data-react-bottom-drawer='${identifier}']`);
      if (stylesheet) { stylesheet.remove(); }
    }
  }, [duration, hideScrollbars]);

  return classNames;
}

export default useGlobalStyles;
