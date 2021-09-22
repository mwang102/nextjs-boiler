import Head from "next/head";
import { css } from "@emotion/react";
import { useState } from "react";
import TombStone from "../components/TombStone";
import OpacityTransition from "../utils/OpacityTransition";

const tombStoneStyles = css`
  display: flex;
  position: relative;
`;

export default function Home() {
  const [openTomb, setOpenTomb] = useState(0);

  const titleText = "WELCOME\nTO\nTHE\nBOILER";
  const titleStepOne = "STEP\nONE";
  const titleStepTwo = "STEP\nTWO";
  const titleStepThree = "STEP\nTHREE";

  const handleNext = () => {
    console.log("logging");
    setOpenTomb((openTomb + 1) % 4);
  };

  const handlePrevious = () => {
    console.log("logging");
    setOpenTomb((openTomb === 0 ? 3 : openTomb - 1) % 4);
  };

  return (
    <div>
      <Head>
        <title>Create Next Boiler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={tombStoneStyles}>
        <OpacityTransition in={openTomb === 0}>
          <TombStone
            onClickPrev={handlePrevious}
            onClickNext={handleNext}
            text={titleText}
          />
        </OpacityTransition>
        <OpacityTransition in={openTomb === 1}>
          <TombStone
            onClickPrev={handlePrevious}
            onClickNext={handleNext}
            text={titleStepOne}
          />
        </OpacityTransition>
        <OpacityTransition in={openTomb === 2}>
          <TombStone
            onClickPrev={handlePrevious}
            onClickNext={handleNext}
            text={titleStepTwo}
          />
        </OpacityTransition>
        <OpacityTransition in={openTomb === 3}>
          <TombStone
            onClickPrev={handlePrevious}
            onClickNext={handleNext}
            text={titleStepThree}
          />
        </OpacityTransition>
      </div>
    </div>
  );
}
