import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Digit from './Digit';
import Calculator from './Calculator';
import summation from './summation.png'



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

  renderSummation() {
    return (
      <button
        onClick={() => this.props.onSummation()}>
        <img className='button-icon' src={summation} alt='summation' />
        </button>
    )
  }

  renderBackspace() {
    return (
      <button
        onClick={() => this.props.onBackspace()}>
        Backspace
      </button>
    )
  }

  renderClear() {
    return (
      <button
        onClick={() => this.props.onClear()}>
        Clear
      </button>
    )
  }

  renderEnter() {
    return (
      <button
        onClick={() => this.props.onEnter()}>
        Enter
      </button>
    )
  }

  render() {
    return (
      <div className='keypad'>
        <div className='numbers'>
          <div>
            {this.renderDigit('7', 'number')}
            {this.renderDigit('8', 'number')}
            {this.renderDigit('9', 'number')}
          </div>
          <div>
            {this.renderDigit('4', 'number')}
            {this.renderDigit('5', 'number')}
            {this.renderDigit('6', 'number')}
          </div>
          <div>
            {this.renderDigit('1', 'number')}
            {this.renderDigit('2', 'number')}
            {this.renderDigit('3', 'number')}
          </div>
          <div>
            {this.renderDigit('0', 'number')}
            {this.renderDigit('.', 'decimal')}
          </div>
        </div>
        <div className='operations'>
          {this.renderDigit('+', 'operation')}
          {this.renderDigit('-', 'operation')}
          {this.renderDigit('x', 'operation')}
          {this.renderDigit('/', 'operation')}
          {this.renderDigit('^', 'operation')}
          {this.renderSummation()}
        </div>
        <div className='actions'>
          {this.renderBackspace()}
          {this.renderClear()}
          {this.renderEnter()}
        </div>

      </div>
    );
  }
}

export default Keypad;
