import React from "react";
import styled from "styled-components";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
};

const contentStyle = {
  paddingLeft: "3rem",
  paddingRight: "3rem"
};

const rightStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly"
};

const Layout = styled.div(containerStyle);
const Content = styled.div(contentStyle);
const RightColumn = styled.div(rightStyle);

const addPadding = (component, index) => (
  <div key={index} style={{ flexGrow: 1 }}>
    {component}
  </div>
);

export default ({ children }) => {
  const [first, ...rest] = React.Children.toArray(children);
  return (
    <Layout>
      <Content>{first}</Content>
      <Content>
        <RightColumn>{rest.map(addPadding)}</RightColumn>
      </Content>
    </Layout>
  );
};
