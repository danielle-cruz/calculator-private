import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Calculator from './Calculator';


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
