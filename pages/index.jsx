import Head from "next/head";
import Link from "next/link";
import { css } from "@emotion/react";
import Layout from "../components/Layout";

import media, { defaultBreakpoints } from "../utils/mediaStyles";

const homeContainerStyles = css`
  width: 300px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 5px solid #dea5a4;
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.2);
  background: white;

  ${media.greaterThan(defaultBreakpoints.medium)`
    border: 5px solid black;
  `};
`;

const titleStyles = css`
  color: #dea5a4;

  ${media.greaterThan(defaultBreakpoints.medium)`
    color: #CCD4BF;
`};
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next Boiler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section css={homeContainerStyles}>
        <h1 css={titleStyles}>Welcome to the bOilEr</h1>
      </section>
    </div>
  );
}
