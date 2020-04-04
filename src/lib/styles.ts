import { CSSProperties } from "react";

export const TransitionStyles = {
  entering: { transform: "translate3d(0, 100%, 0)" },
  entered:  { transform: "none" },
  exiting:  { transform: "translate3d(0, 100%, 0)" },
  exited:  { display: "none" },
};

export const SlideUpStyles: CSSProperties = {
  position: "fixed",
  zIndex: 11,
  left: 0,
  bottom: 0,
  maxHeight: "70vh",
  width: "100vw",
  background: "white",
  borderTopLeftRadius: "15px",
  borderTopRightRadius: "15px",
  transition: "transform 250ms",
}

export const SlideUpHandleWrapperStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  padding: "10px 0",
}

export const SlideUpHandleStyles: CSSProperties = {
  background: "#e3e3e3",
  height: "5px",
  width: "70px",
  borderRadius: "5px",
}

export const SlideUpContentWrapperStyles: CSSProperties = {
  padding: "0 10px",
  maxHeight: "calc(70vh - 25px)",
  overflowX: "hidden",
  overflowY: "auto"
}


const backdropCommonStyles: CSSProperties = {
  position: "fixed",
  zIndex: 10,
  background: "rgba(0, 0, 0, 0.5)",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  transition: "opacity 250ms"
}

export const BackdropStyles = {
  entering: { ...backdropCommonStyles, opacity: "0" },
  entered:  { ...backdropCommonStyles, opacity: "1" },
  exiting:  { ...backdropCommonStyles, opacity: "0" },
  exited:  { ...backdropCommonStyles, display: "none" },
};