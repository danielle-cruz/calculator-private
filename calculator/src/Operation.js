import React from 'react';
import './styles.css';


class Operation extends React.Component {


  render() {
    return (
      <button
        onClick={this.props.onDigit}>
        {this.props.value}
      </button>
    )
  }
}

export default Operation;
