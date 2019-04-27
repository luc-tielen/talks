import React from "react";
import styled from "styled-components";

const Div = styled.div({
  margin: "0 auto",
  maxWidth: "100%"
});

const SVG = ({ contents, width = "80%" }) => (
  <Div style={{ width }} dangerouslySetInnerHTML={{ __html: contents }} />
);

export default SVG;
