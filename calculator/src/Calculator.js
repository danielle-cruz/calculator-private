import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Screen from './Screen';
import Digit from './Digit';
import Operation from './Operation';
import Keypad from './Keypad';
import Summation from './Summation';

import  {evaluate, backspace} from './evaluate.js'



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
  }

  handleDigit(digitNum, type) {
    if (type === 'operation') {
      if (this.state.lastSeen === 'operation') {
        return;
      } else if (!this.state.lastSeen && this.state.display === '') {
        digitNum = this.state.lastAnswer + ' ' + digitNum + ' ';
      } else {
        digitNum = ' ' + digitNum + ' ';
      }
    }

    if (type === 'decimal') {
      if (this.state.lastSeen === 'decimal') return;
    }

    this.setState({
      display: this.state.display === '0' && type !== 'operation' ? `${digitNum}` : this.state.display + `${digitNum}`,
      lastSeen: type
    });
    console.log(digitNum);
  }

  handleEnter() {
    if (this.state.lastSeen === 'operation') return;

    let expression = this.state.display;
    let result = evaluate(expression);
    let history = this.state.history.slice();

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

  handleBackspace() {
    let [lastType, newExpression] = backspace(this.state.display);
    this.setState({
      display: newExpression === '' ? '0' : newExpression,
      lastSeen: lastType,
      lastAnswer: '0',
    });
  }

  handleClear() {
    this.setState({
      display: '0',
      lastSeen: null,
      lastAnswer: '0',
    });
  }

  handleClearHistory() {
    this.setState({
      display: '0',
      lastSeen: null,
      lastAnswer: '0',
      isSummation: false,
      history: []
    })
  }

  handleSummation() {
    const display = (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type='number' min='0' step='1' value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>
      </div>
    )

    this.setState({
      display: display,
      isSummation: true
    })
  }

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
          onHistory={(historyValue) => this.handleHistory(historyValue)}/>
        <Keypad
          onDigit={(digitNum, type) => this.handleDigit(digitNum, type)}
          onEnter={() => this.handleEnter()}
          onBackspace={() => this.handleBackspace()}
          onClear={() => this.handleClear()}
          onClearHistory={() => this.handleClearHistory()}
          onSummation={() => this.handleSummation()}
          isSummation={this.state.isSummation}
          />
      </div>
    );
  }
}

export default Calculator;
