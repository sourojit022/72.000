import React from "react";

function getAccordion(stage) {
  return class Accordion extends React.Component {
    state = {
      active: -1,
      reserve: null
    };

    onShow = (i) => {
      this.setState({
        active: i,
        reserve: i
      });

      if (this.state.reserve === i) {
        this.setState({
          active: -1,
          reserve: -1
        });
      }
    };

    render() {
      const children = React.Children.map(this.props.children, (child, i) => {
        return React.cloneElement(child, {
          heading: this.state.active === i,
          text: this.state.active + stage === i,
          onShow: () => this.onShow(i)
        });
      });
      return <div className="accordion">{children}</div>;
    }
  };
}
export default getAccordion;
