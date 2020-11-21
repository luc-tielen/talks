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

const A = styled.a({
  color: "#296aff"
});

const Github = ({ repo }) => {
  const url = `https://github.com/${repo}.git`;
  return (
    <Span>
      <Img src={logo} />
      <A href={url}>{url}</A>
    </Span>
  );
};

export default Github;
