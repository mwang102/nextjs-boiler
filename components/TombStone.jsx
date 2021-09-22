import { css } from "@emotion/react";
import Button from "./Button";

import media, { defaultBreakpoints } from "../utils/mediaStyles";

const homeContainerStyles = css`
  width: 300px;
  height: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 50px;
  border: 3px solid #dea5a4;
  background: white;
  margin: 25px;
  position: absolute;
  top: 25px;
  left: -150px;

  transform: translatey(0px);
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0% {
      box-shadow: inset 8px -8px 0 0 white, inset 8px -8px 0 3px #dea5a4,
        -8px 8px 0 rgba(0, 0, 0, 0.6);
      transform: translatey(0px);
    }
    50% {
      box-shadow: inset 8px -8px 0 0 white, inset 8px -8px 0 3px #dea5a4,
        -16px 16px 0 rgba(0, 0, 0, 0.4);
      transform: translatey(-10px);
    }
    100% {
      box-shadow: inset 8px -8px 0 0 white, inset 8px -8px 0 3px #dea5a4,
        -8px 8px 0 rgba(0, 0, 0, 0.6);
      transform: translatey(0px);
    }
  }

  ${media.greaterThan(defaultBreakpoints.medium)`
    border: 3px solid #dea5a4;
  `};
`;

const titleStyles = css`
  color: #ccd4bf;
  font-size: 36px;
  white-space: pre;
  text-shadow: -1px 1px 0 #dea5a4, -2px 2px 0 #dea5a4, -3px 3px 0 #dea5a4,
    -4px 4px 0 #dea5a4, -5px 5px 0 #dea5a4;
  ${media.greaterThan(defaultBreakpoints.medium)`
    color: #CCD4BF;
`};
`;

const buttonGroupStyles = css`
  display: flex;
`;

const TombStone = ({ text, onClickPrev, onClickNext }) => {
  console.log("tomb");
  return (
    <section css={homeContainerStyles}>
      <h1 css={titleStyles}>{text}</h1>
      <div css={buttonGroupStyles}>
        <Button onClick={onClickPrev} text="prev" />
        <Button onClick={onClickNext} text="next" />
      </div>
    </section>
  );
};

export default TombStone;
