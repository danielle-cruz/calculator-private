import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Digit from './Digit';
import Calculator from './Calculator';
import summation from './summation.png'



class Summation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lowerLimit: null,
      upperLimit: null,
      function: null,
    }
  }

  render() {
    return (
      <button onClick={this.props.onSummation}>
        <img className='button-icon' src={summation} alt='summation' />
      </button>
    );
  }
}

export default Summation;
