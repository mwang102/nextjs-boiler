import { css } from "@emotion/react";
import Head from "next/head";
import media, { defaultBreakpoints } from "../utils/mediaStyles";

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
  align-items: top;
  width: 100%;

  font-family: "Questrial", sans-serif;
  background-color: #ffec63;
  background-image: linear-gradient(
      45deg,
      #ffd966 25%,
      transparent 25%,
      transparent 75%,
      #ffd966 75%,
      #ffd966
    ),
    linear-gradient(
      -45deg,
      #ffd966 25%,
      transparent 25%,
      transparent 75%,
      #ffd966 75%,
      #ffd966
    );
  background-size: 60px 60px;
  background-position: 0 0;
  animation: slide 4s infinite linear;

  @keyframes slide {
    from {
      background-position: 0 0;
    }

    to {
      background-position: -120px 60px;
    }
  }
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
    <main css={mainStyles}>{children}</main>
    <footer css={footerStyles}>
      <h1>Footer</h1>
    </footer>
  </div>
);

export default Layout;
