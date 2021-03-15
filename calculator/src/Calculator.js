import React from 'react';
import './styles.css';
import Screen from './Screen';
import Keypad from './Keypad';
import Summation from './Summation';

import  {pemdasEvaluate,backspace} from './evaluate.js'

/* Calculator:
 * Contains the Screen and Keypad classes */

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      lastSeen: null,
      lastAnswer: '0',
      isSummation: false,
      history: []
    }

    /* Callback function */
    this.displaySum = this.displaySum.bind(this);
  }

  /* Handle Digit: Updates screen display and button capabilities after pressing
   * a digit button (includes numbers, operators, decimals)*/
  handleDigit(digitNum, type) {

    // Pressing operator: Prevents consecutive operations, defaults operations
    //  to 0 when no number precedes the operation, or adds the operation to the display */
    if (type === 'operation') {
      if (this.state.lastSeen === 'operation') {
        return;
      } else if (!this.state.lastSeen && this.state.display === '') {
        digitNum = this.state.lastAnswer + ' ' + digitNum + ' ';
      } else {
        digitNum = ' ' + digitNum + ' ';
      }
    }

    // Pressing decimal: Prevents consecutive decimals
    if (type === 'decimal') {
      if (this.state.lastSeen === 'decimal') return;
    }

    // Updates display and records what type of character was just typed
    this.setState({
      display: this.state.display === '0' && type !== 'operation' ?
        `${digitNum}` :
         this.state.display + `${digitNum}`,
      lastSeen: type
    });
    console.log(digitNum);
  }

  /* Handle Enter: Computes current expression and updates display */
  handleEnter() {
    // Prevents evaluating an incomplete expression
    if (this.state.lastSeen === 'operation') return;

    let expression = this.state.display;
    let result = pemdasEvaluate(expression);
    let history = this.state.history.slice();

    // Updates display and updates history of calculations
    this.setState({
      display: result !== 'Error' ? result : '0',
      lastSeen: null,
      lastAnswer: result,
      history: history.concat([{
        expression: expression,
        result: result,
      }]),
    });
  }

  /* Handle Backspace: Backspaces numbers and operands one at a time */
  handleBackspace() {
    let [lastType, newExpression] = backspace(this.state.display);
    this.setState({
      display: newExpression === '' ? '0' : newExpression,
      lastSeen: lastType,
      lastAnswer: '0',
    });
  }

  /* Handle Clear: Clears the current expression and sets it to 0 */
  handleClear() {
    this.setState({
      display: '0',
      lastSeen: null,
      lastAnswer: '0',
      isSummation: false,
    });
  }

  /* Handle Clear History: Clears all previous calculations from history */
  handleClearHistory() {
    this.setState({
      display: '0',
      lastSeen: null,
      lastAnswer: '0',
      isSummation: false,
      history: []
    })
  }

  /* Display Sum: Displays results from evaluating a summation, including the parameters
   * used to compute the sum and the sum itself */
  displaySum(upperLimit, lowerLimit, sumFunction, sum) {
    let history = this.state.history.slice();
    let expression = 'Upper Limit=' + upperLimit + ', Lower Limit=' + lowerLimit + ', function= ' + sumFunction;
    this.setState({
      display: sum,
      isSummation: false,
      history: history.concat([{
        expression: expression,
        result: sum,
      }]),
    })
  }

  /* Handle History: Appends past expressions and answers to the current expression
   * when clicking on past entries */
  handleHistory(historyValue) {
    this.setState({
      display: (this.state.display !== '0' ?
        this.state.display + `${historyValue}` :
        `${historyValue}`),
      lastSeen: 'number'
    })
  }

  render() {
    return (
      <div className='calculator'>
        Tutorfly calculator
        <Screen
          display={this.state.display}
          history={this.state.history}
          isSummation={this.state.isSummation}
          summationCallback={this.displaySum}
          onHistory={(historyValue) => this.handleHistory(historyValue)}/>
        <Keypad
          onDigit={(digitNum, type) => this.handleDigit(digitNum, type)}
          onEnter={() => this.handleEnter()}
          onBackspace={() => this.handleBackspace()}
          onClear={() => this.handleClear()}
          onClearHistory={() => this.handleClearHistory()}
          onSummation={() => { this.setState({isSummation: true})}}
          isSummation={this.state.isSummation}
          />
      </div>
    );
  }
}

export default Calculator;
