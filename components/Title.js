import React from "react";
import styled from "styled-components";

const H1 = styled.h1({
  color: "#39C0BA",
  lineHeight: "1.25em",
  fontSize: "3em",
  margin: "0"
});

const H2 = styled.h2({
  color: "#39C0BA",
  lineHeight: "1.25em",
  fontSize: "2.4em",
  margin: 0
});

const Title = ({ contents, subtitle }) => <div>
  <H1>{contents}</H1>
  <H2>{subtitle}</H2>
  </div>;

export default Title;
