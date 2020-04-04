import debounce from "lodash.debounce";
import * as React from "react";
import { useSwipeable } from "react-swipeable";
import { Transition } from "react-transition-group";
import useEscButton from "./lib/hooks/useEscButton";
import usePreventScroll from "./lib/hooks/usePreventScroll";
import {
  SlideUpStyles,
  SlideUpHandleStyles,
  BackdropStyles,
  TransitionStyles,
  SlideUpContentWrapperStyles,
  SlideUpHandleWrapperStyles,
} from "./lib/styles";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
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
}: IProps) => {
  // Actions to close
  useEscButton(onClose, isVisible);
  usePreventScroll(isVisible);

  // Swiping down interaction
  const [currentDeltaY, setDeltaY] = React.useState(0);
  const swipeHandlers = useSwipeable({
    onSwipedDown: debounce(
      ({ velocity, event }) => {
        setDeltaY(0);
        if (velocity > 0.5) {
          onClose();
        }
      },
      500,
      { leading: true }
    ),
    onSwiping: ({ deltaY, event }) => {
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
        timeout={{ appear: 0, enter: 0, exit: 250 }}
        unmountOnExit={unmountOnExit}
        mountOnEnter={mountOnEnter}
      >
        {(state) => (
          <>
            <div onClick={onClose} style={BackdropStyles[state]} />
            <div
              style={{
                ...SlideUpStyles,
                ...TransitionStyles[state],
                ...getTransforms(),
              }}
            >
              <div {...swipeHandlers} style={SlideUpHandleWrapperStyles}>
                <div style={{ ...SlideUpHandleStyles }} />
              </div>
              <div style={SlideUpContentWrapperStyles}>{children}</div>
            </div>
          </>
        )}
      </Transition>
    </>
  );
};

export default SlideUpTransition;
