import React from "react";

export const strong = color => props => {
  return <strong style={{ color: color }}>{props.children}</strong>;
};
