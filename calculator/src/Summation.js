import React from 'react';
import './styles.css';
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
