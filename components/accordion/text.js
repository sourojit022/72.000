import React from 'react';

class Text extends React.Component {
  render() {
    return (
      <div style={{ ...this.props.style }}>
        <div className={`content ${this.props.text ? 'open' : ''}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Text;
