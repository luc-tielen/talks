import React, { Component } from "react";
import { select } from "d3";
import { VennDiagram as Diagram } from "venn.js";

const prepareData = data =>
  data.map(({ values, size }) => ({ sets: values, size }));

class VennDiagram extends Component {
  componentDidMount() {
    const svg = select(this.ref);
    const preparedData = prepareData(this.props.data);
    const chart = Diagram();
    svg.datum(preparedData).call(chart);
  }

  render() {
    return <div ref={ref => (this.ref = ref)} />;
  }
}

export default VennDiagram;
