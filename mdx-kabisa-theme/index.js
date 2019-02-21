import React from "react";
import baseTheme from "mdx-deck/themes";

import { strong } from "./Strong";
import syntaxTheme from "./tomorrow-prism-theme";
import prismReason from "react-syntax-highlighter/languages/prism/reason";
import ThemeProvider from "mdx-deck/dist/Provider";

import { convertTheme as toCodeSurferTheme } from "./codeSurferThemeConverter";

const colorPrimary = "#39C0BA";

const SlideNumber = ({ number }) => (
  <div
    style={{
      position: "absolute",
      bottom: "1.5em",
      right: "1.5em"
    }}
  >
    <span style={{ color: colorPrimary }}>{number}</span>
  </div>
);

const KabisaLogo = _props => (
  <div
    style={{
      position: "absolute",
      top: "1.5em",
      right: "1.5em"
    }}
  >
    <img
      style={{ height: "5vmin", minHeight: "30px" }}
      src={require("./kabisa.png")}
    />
  </div>
);

const Provider = props => {
  const { children, ...rest } = props;

  return (
    <ThemeProvider {...rest}>
      {children}

      {props.mode == "NORMAL" && (
        <React.Fragment>
          {props.index > 0 && <SlideNumber number={props.index + 1} />}
          <KabisaLogo />
        </React.Fragment>
      )}
    </ThemeProvider>
  );
};

const codeSurferTheme = toCodeSurferTheme(syntaxTheme);
export const makeCodeSurfer = LibCodeSurfer => props => {
  const syntaxThemeContainer = syntaxTheme['pre[class*="language-"]'];

  return (
    <React.Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `
      pre.prism-code code {
        background: ${syntaxThemeContainer.background};
        padding: ${syntaxThemeContainer.padding};
        border-radius: ${syntaxThemeContainer.borderRadius};
      }

      code .token-line:last-child {
        display: none;
      }
    `
        }}
      />
      <LibCodeSurfer theme={codeSurferTheme} {...props} />
    </React.Fragment>
  );
};

export default {
  ...baseTheme,
  font: "Quicksand, sans-serif",
  prism: {
    style: syntaxTheme,
    languages: {
      reason: prismReason
    }
  },
  colors: {
    ...baseTheme.colors,
    text: "#F0F0F0",
    background: "#22242A",
    link: "#296aff"
  },
  css: {
    ...baseTheme.css,
    // https://github.com/jxnblk/mdx-deck/pull/204
    "li > ul, li > ol": {
      fontSize: "inherit"
    },
    "li > p": {
      fontSize: "inherit",
      margin: 0
    }
  },
  heading: {
    color: colorPrimary,
    textAlign: "left"
  },
  li: {
    marginBottom: ".5em"
  },
  components: {
    strong: strong(colorPrimary)
  },
  Provider

  // Customize your presentation theme here.
  //
  // Read the docs for more info:
  // https://github.com/jxnblk/mdx-deck/blob/master/docs/theming.md
  // https://github.com/jxnblk/mdx-deck/blob/master/docs/themes.md
};
