import React from "react";
import { withDeck } from "mdx-deck/dist/context";
import { setSteps } from "mdx-deck/dist/updaters";
import Markdown from "react-markdown";

export class Step extends React.Component {
  render() {
    return <Markdown source={this.props.children} />;
  }
}

export const Steps = withDeck(
  class StepsComponent extends React.Component {
    constructor(props) {
      super(props);
      const { update, index } = props.deck;
      const stepsCount = props.children.length;
      update(setSteps(index, stepsCount - 1));
    }

    render() {
      return this.props.children[this.props.deck.step];
    }
  }
);
