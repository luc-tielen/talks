import React from "react";
import { withDeck } from "mdx-deck/dist/context";
import { setSteps } from "mdx-deck/dist/updaters";
import Markdown from "react-markdown";

export const Step = Markdown;

export const Steps = withDeck(
  class StepsComponent extends React.Component {
    constructor(props) {
      super(props);
      const { update, index } = props.deck;
      const stepsCount = props.children.length;
      update(setSteps(index, stepsCount - 1));
    }

    render() {
      const { children, deck } = this.props;
      if (deck.step === undefined) {
        // in presenter mode
        return children;
      }

      // Defensive code because all components are mounted at
      // beginning of presentation, step can go beyond array length
      return children[deck.step] || null;
    }
  }
);
