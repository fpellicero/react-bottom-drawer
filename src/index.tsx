import debounce from "lodash.debounce";
import * as React from "react";
import { useSwipeable } from "react-swipeable";
import { Transition } from "react-transition-group";
import useEscButton from "./lib/hooks/useEscButton";
import usePreventScroll from "./lib/hooks/usePreventScroll";
import {
  BackdropStyles,
  TransitionStyles,
} from "./lib/styles";
import useGlobalStyles from "./lib/hooks/useGlobalStyles";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  hideScrollbars?: boolean;
  unmountOnExit?: boolean;
  mountOnEnter?: boolean;
  children: React.ReactNode;
}

const SlideUpTransition = ({
  isVisible,
  children,
  onClose,
  unmountOnExit = true,
  mountOnEnter = true,
  duration = 250,
  hideScrollbars = false,
}: IProps) => {
  const classNames = useGlobalStyles(duration, hideScrollbars);
  const nodeRef = React.useRef(null);
  
  // Actions to close
  useEscButton(onClose, isVisible);
  usePreventScroll(isVisible, classNames.contentWrapper);

  // Swiping down interaction
  const [currentDeltaY, setDeltaY] = React.useState(0);
  const swipeHandlers = useSwipeable({
    onSwipedDown: debounce(
      ({ velocity }) => {
        setDeltaY(0);
        if (velocity > 0.5) {
          onClose();
        }
      },
      500,
      { leading: true }
    ),
    onSwiping: ({ deltaY }) => {
      setDeltaY(deltaY);
    },
  });

  const getTransforms = (): React.CSSProperties | undefined => {
    if (currentDeltaY >= 0) {
      return undefined;
    }

    return {
      transform: `translate3d(0, ${currentDeltaY * -1}px, 0)`,
      transition: "none",
    };
  };

  // Layout
  return (
    <>
      <Transition
        appear={true}
        in={isVisible}
        timeout={{ appear: 0, enter: 0, exit: duration }}
        unmountOnExit={unmountOnExit}
        mountOnEnter={mountOnEnter}
        nodeRef={nodeRef}
      >
        {(state) => (
          <div ref={nodeRef}>
            <div onClick={onClose} className={classNames.backdrop} style={BackdropStyles[state]} />
            <div
            className={classNames.drawer}
              style={{
                ...TransitionStyles[state],
                ...getTransforms(),
              }}
            >
              <div {...swipeHandlers} className={classNames.handleWrapper}>
                <div className={classNames.handle} />
              </div>
              <div className={classNames.contentWrapper}>{children}</div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

export default SlideUpTransition;
