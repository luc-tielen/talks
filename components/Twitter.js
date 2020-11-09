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

const Twitter = () => (
  <Span>
    <Img src={logo} />
    <a href="https://twitter.com/luctielen">@luctielen</a>
  </Span>
);

export default Twitter;
