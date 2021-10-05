import { css } from "@emotion/react";
import Head from "next/head";
import media, { defaultBreakpoints } from "../utils/mediaStyles";
import PromiseQueueProvider from "../js-machine/PromiseQueue.jsx";

const headerStyles = css`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #dea5a4;
  border-bottom: 3px solid #dea5a4;

  ${media.greaterThan(defaultBreakpoints.medium)`
    border-bottom: 3px solid #CCD4BF;
    color: #CCD4BF;
  `};
`;

const footerStyles = css`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 3px solid #dea5a4;
  color: #dea5a4;

  ${media.greaterThan(defaultBreakpoints.medium)`
    border-top: 3px solid #CCD4BF;
    color: #CCD4BF;
  `};
`;

const containerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 0 0.5rem;
  flex-direction: column;
  height: 100vh;
`;

const mainStyles = css`
  flex: 1 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Layout = ({ children }) => (
  <div css={containerStyles}>
    <Head>
      <meta
        name="description"
        content="Learn how to build a personal website using Next.js"
      />
    </Head>
    <header css={headerStyles}>
      <h1>Header</h1>
    </header>
    <PromiseQueueProvider>
      <main css={mainStyles}>{children}</main>
    </PromiseQueueProvider>
    <footer css={footerStyles}>
      <h1>Footer</h1>
    </footer>
  </div>
);

export default Layout;
