import React from "react";

// TODO use webpack and CSS modules to avoid inline styles
const containerStyle = {
  display: "flex",
  flexDirection: "row"
};

const contentStyle = {
  padding: "3rem"
};

export default ({ children }) => {
  const count = children.length;
  const leftCount = Math.ceil(count / 2);
  const leftChildren = children.slice(0, leftCount);
  const rightChildren = children.slice(leftCount);
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>{leftChildren}</div>
      <div style={contentStyle}>{rightChildren}</div>
    </div>
  );
};
