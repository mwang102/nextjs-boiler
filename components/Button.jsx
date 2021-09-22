import { css } from "@emotion/react";

const buttonStyles = css`
  text-decoration: none;
  color: #ccd4bf;
  margin: 10px;
  width: 75px;
  display: inline-block;
  line-height: 40px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
  background-color: #fff;
  border: 1px solid #dea5a4;
  box-shadow: -1px 1px 0 #dea5a4, -2px 2px 0 #dea5a4, -3px 3px 0 #dea5a4,
    -4px 4px 0 #dea5a4, -5px 5px 0 #dea5a4;

  position: relative;

  :after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    background-color: #fff;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
  }

  :hover {
    background-color: #f6d51e;
    color: white;
  }

  :active {
    top: 5px;
    right: 5px;
    box-shadow: 0 0 0 0;
  }
`;

const Button = ({ text }) => (
  <button css={buttonStyles} type="button">
    {text}
  </button>
);

export default Button;
