import Head from "next/head";
import Link from "next/link";
import { css } from "@emotion/react";
import Layout from "../components/Layout";
import Button from "../components/Button";

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
  // box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.2);
  background: white;

  transform: translatey(0px);
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0% {
      // box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);

      box-shadow: inset 8px -8px 0 0 white, inset 8px -8px 0 3px #dea5a4,
        -8px 8px 0 rgba(0, 0, 0, 0.6);
      transform: translatey(0px);
    }
    50% {
      // box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);

      box-shadow: inset 8px -8px 0 0 white, inset 8px -8px 0 3px #dea5a4,
        -16px 16px 0 rgba(0, 0, 0, 0.4);
      transform: translatey(-10px);
    }
    100% {
      // box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);

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

export default function Home() {
  const titleText = "WELCOME\nTO\nTHE\nBOILER";
  return (
    <div>
      <Head>
        <title>Create Next Boiler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section css={homeContainerStyles}>
        <h1 css={titleStyles}>{titleText}</h1>
        <div css={buttonGroupStyles}>
          <Button text="Click" />
          <Button text="Click" />
        </div>
      </section>
    </div>
  );
}
