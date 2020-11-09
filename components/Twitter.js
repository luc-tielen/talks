import React from "react";
import styled from "styled-components";
import logo from "./images/twitter.svg";

const Span = styled.span({
  display: "flex",
  alignItems: "center"
});

const Img = styled.div({
  width: "10%"
});

const Twitter = () => (
  <Span>
    <Img dangerouslySetInnerHTML={{ __html: logo }} />
    <a href="https://twitter.com/luctielen">@luctielen</a>
  </Span>
);

export default Twitter;
