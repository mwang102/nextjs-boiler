// mostly stolen from https://github.com/morajabi/styled-media-query
import { css } from "@emotion/react";

import rem from "./rem";

export const defaultBreakpoints = {
  default: "0",
  extraLarge: rem(1440),
  extraSmall: rem(340),
  large: rem(1280),
  medium: rem(960),
  small: rem(600),
};

const getSizeFromBreakpoint = (breakpointValue, breakpoints = {}) => {
  if (breakpoints[breakpointValue]) {
    return breakpoints[breakpointValue];
  }

  if (Number(breakpointValue) || Number(breakpointValue.replace("rem", ""))) {
    return breakpointValue;
  }

  console.error(
    "Media breakpoints: No valid breakpoint or size specified for media."
  );

  return null;
};

export const generateBreakpointsList = (breakpoints) =>
  Object.entries(breakpoints)
    .map(([breakpointName, breakpointValueString]) => ({
      breakpointName,
      breakpointValue:
        Number(
          breakpointValueString.replace(
            // match any number of digits & decimals as the first group, followed by any other characters
            // replace the entire string with the first group of digits & decimals
            /^([\d.]+).*$/,
            "$1"
          )
        ) * 16,
    }))
    .slice()
    .sort(
      (breakpointA, breakpointB) =>
        breakpointA.breakpointValue - breakpointB.breakpointValue
    );

export function generateMedia(breakpoints = defaultBreakpoints) {
  const lessThan =
    (breakpoint) =>
    (...args) =>
      css`
        @media (max-width: ${getSizeFromBreakpoint(breakpoint, breakpoints)}) {
          ${css(...args)}
        }
      `;

  const greaterThan =
    (breakpoint) =>
    (...args) =>
      css`
        @media (min-width: ${getSizeFromBreakpoint(breakpoint, breakpoints)}) {
          ${css(...args)}
        }
      `;

  const between =
    (firstBreakpoint, secondBreakpoint) =>
    (...args) =>
      css`
        @media (min-width: ${getSizeFromBreakpoint(
            firstBreakpoint,
            breakpoints
          )}) and (max-width: ${getSizeFromBreakpoint(
            secondBreakpoint,
            breakpoints
          ) - 1}) {
          ${css(...args)}
        }
      `;

  return {
    between,
    greaterThan,
    lessThan,
  };
}

export default generateMedia();
