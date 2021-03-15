import React from 'react';
import './styles.css';

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
