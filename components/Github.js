import React from "react";
import styled from "styled-components";
import logo from "./images/github.svg";

const Span = styled.span({
  display: "flex",
  alignItems: "center"
});

const Img = styled.img({
  width: "10%",
  paddingRight: "10px"
});

const Github = ({ repo }) => {
  const url = `https://github.com/${repo}.git`;
  return (
    <Span>
      <Img src={logo}/>
      <a href={url}>{url}</a>
    </Span>
  );
};

export default Github;
