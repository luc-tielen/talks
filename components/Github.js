import React from "react";
import styled from "styled-components";
import logo from "./images/github.svg";

const Span = styled.span({
  display: "flex",
  alignItems: "center"
});

const Img = styled.div({
  width: "10%",
  height: "100%",
  fill: "white"
});

// <img src="./images/github.png" />
const Github = ({ repo }) => {
  const url = `https://github.com/${repo}.git`;
  return (
    <Span>
      <Img dangerouslySetInnerHTML={{ __html: logo }} />
      <a href={url}>{url}</a>
    </Span>
  );
};

export default Github;
