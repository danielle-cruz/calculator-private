import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Digit from './Digit';
import Calculator from './Calculator';



class Keypad extends React.Component {
  constructor(props) {
    super(props)
  }

  renderDigit(digitNum, type) {
    return (
      <Digit
        value={digitNum}
        onDigit={() => this.props.onDigit(digitNum, type)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderDigit('0', 'digit')}
        {this.renderDigit('1', 'digit')}
        {this.renderDigit('2', 'digit')}
        {this.renderDigit('3', 'digit')}
        {this.renderDigit('.', 'decimal')}
        {this.renderDigit('+', 'operation')}
        {this.renderDigit('-', 'operation')}
        {this.renderDigit('x', 'operation')}
        {this.renderDigit('/', 'operation')}
        {this.renderDigit('^', 'operation')}
      </div>
    );
  }
}

export default Keypad;
