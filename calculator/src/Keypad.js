import React from 'react';
import './styles.css';
import Digit from './Digit';
import summation from './summation.png'

/* Keypad:
 * Contains all of the number, operand, decimal, and action buttons
 * like "Enter", "Clear", "Backspace" */

class Keypad extends React.Component {

  /* Render Digit: Renders the number, operand, and decimal buttons.
   * Types a digit in the display when clicked. */
  renderDigit(digitNum, type) {
    return (
      <Digit
        value={digitNum}
        onDigit={() => this.props.onDigit(digitNum, type)}
      />
    );
  }

  /* Render Summation: Renders the summation button. Displays form inputs
   * like for summation information when clicked.  */
  renderSummation() {
    return (
      <button
        onClick={() => this.props.onSummation()}>
        <img className='button-icon' src={summation} alt='summation' />
        </button>
    )
  }

  /* Render Backspace: Renders the backspace button. Deletes numbers
   * and operators from the display one by one when clicked. */
  renderBackspace() {
    if (this.props.isSummation) return;
    return (
      <button
        onClick={() => this.props.onBackspace()}>
        Backspace
      </button>
    )
  }

  /* Render Clear: Renders the clear button. Clears the current expression
   * and sets it to 0 when clicked. */
  renderClear() {
    return (
      <button
        onClick={() => this.props.onClear()}>
        Clear
      </button>
    )
  }

  /* Render Clear History: Renders the clear history button. Clears all
   * previous calculations from history when clicked. */
  renderClearHistory() {
    return (
      <button
        onClick={() => this.props.onClearHistory()}>
        Clear History
      </button>
    )
  }

  /* Render Enter: Renders the enter button. Computes current expression
   * and updates display when clicked */
  renderEnter() {
    if (this.props.isSummation) return;
    return (
      <button
        onClick={() => this.props.onEnter()}>
        Enter
      </button>
    )
  }

  render() {
    console.log(this.props.isSummation);
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
          {this.renderClearHistory()}
          {this.renderEnter()}
        </div>
      </div>
    );
  }
}

export default Keypad;
