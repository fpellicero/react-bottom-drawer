import * as React from "react";

function usePreventScroll(enabled: boolean) {
  React.useEffect(() => {
    if (typeof document === "undefined" || !enabled) {
      return;
    }

    const body = document.body;

    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = "";
    }
  }, [enabled]);
}

export default usePreventScroll;
