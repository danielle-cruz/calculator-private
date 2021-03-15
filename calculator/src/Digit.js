import React from 'react';
import './styles.css';

/* Digit
 * Creates the buttons for numbers, operands, and decimals */

class Digit extends React.Component {

  render() {
    return (
      <button className='digit'
        onClick={this.props.onDigit}>
        {this.props.value}
      </button>
    )
  }
}

export default Digit;
