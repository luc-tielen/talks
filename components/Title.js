import React from "react";
import styled from "styled-components";

const H1 = styled.h1({
  color: "#39C0BA",
  lineHeight: "1.25em",
  fontSize: "3em"
});

const Title = ({ contents }) => <H1>{contents}</H1>;

export default Title;
