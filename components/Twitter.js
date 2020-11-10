import React from "react";
import styled from "styled-components";
import logo from "./images/twitter.svg";

const Span = styled.span({
  display: "flex",
  alignItems: "center"
});

const Img = styled.img({
  width: "10%",
  paddingRight: "10px"
});

const A = styled.a({
  color: "blue"
});

const Twitter = () => (
  <Span>
    <Img src={logo} />
    <A href="https://twitter.com/luctielen">@luctielen</A>
  </Span>
);

export default Twitter;
