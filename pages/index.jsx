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
  border-radius: 25px;
  border: 3px solid #dea5a4;

  ${media.greaterThan(defaultBreakpoints.medium)`
    border: 3px solid #CCD4BF;
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
    <Layout>
      <Head>
        <title>Create Next Boiler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section css={homeContainerStyles}>
        <h1 css={titleStyles}>Welcome to the bOilEr</h1>
      </section>
    </Layout>
  );
}
