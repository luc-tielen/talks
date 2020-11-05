import React from "react";
import Markdown from "react-markdown";
import styled from "styled-components";

const Div = styled.div({
  margin: "0 auto",
  maxWidth: "100%"
});

export const SVG = ({ contents, width = "80%" }) => (
  <Div style={{ width }} dangerouslySetInnerHTML={{ __html: contents }} />
);

export const InlineSVG = ({ contents, width = "80%" }) => (
  <img src={contents} style={{ width }} />
);

export default SVG;
