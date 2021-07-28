import React from 'react';

class Heading extends React.Component {
  render() {
    const { heading, onShow, children } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          ...this.props.style,
        }}
        onClick={onShow}
      >
        {children}

        {this.props.render && this.props.render(heading)}
      </div>
    );
  }
}

export default Heading;
