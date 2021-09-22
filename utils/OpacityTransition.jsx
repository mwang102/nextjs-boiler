import { ClassNames } from "@emotion/react";
import { CSSTransition } from "react-transition-group";

const OpacityTransition = (props) => (
  <ClassNames>
    {({ css }) => (
      <CSSTransition
        {...props}
        classNames={{
          enter: css`
            opacity: 0;
            // transform: scale(0.9);
          `,
          enterActive: css`
            opacity: 1;
            transform: translateX(0);
            // transition: opacity 300ms, transform 300ms;
            transition: opacity 300ms;
            transition-delay: 300ms;
          `,
          exit: css`
            opacity: 1;
          `,
          exitActive: css`
            opacity: 0;
            // transform: scale(0.9);
            transition: opacity 300ms;
            transition-delay: 300ms;
          `,
        }}
        timeout={parseInt(250, 10) + 300}
        unmountOnExit
      >
        {props.children}
      </CSSTransition>
    )}
  </ClassNames>
);

export default OpacityTransition;
