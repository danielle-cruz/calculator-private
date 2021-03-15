import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Screen from './Screen';
import Digit from './Digit';
import Operation from './Operation';
import Keypad from './Keypad';


import  {evaluate, backspace} from './evaluate.js'


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      lastSeen: null,
      lastAnswer: '0',
      history: []
    }
  }


  handleDigit(digitNum, type) {
    console.log(this.state)
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
    let result = evaluate(this.state.display);

    const history = this.state.history.slice();

    this.setState({
      display: result !== 'Error' ? result : '0',
      lastSeen: null,
      lastAnswer: result,
      history: history.concat([{
        expression: expression,
        result: result,
      }]),
    });

    console.log(this.state)
  }


  handleBackspace() {
    let [lastType, newExpression] = backspace(this.state.display);
    this.setState({
      display: newExpression === '' ? '0' : newExpression,
      lastSeen: lastType,
      lastAnswer: '0',
    });
    console.log(this.state.lastSeen)
  }

  handleClear() {
    this.setState({
      display: '0',
      lastSeen: null,
      lastAnswer: '0',
    });
  }

  handleHistory(historyValue) {
    this.setState({
      display: this.state.display !== '0' ? this.state.display + `${historyValue}` : `${historyValue}`,
      lastSeen: 'digit'
    })
  }

  render() {

    console.log(this.state.history);
    const history = this.state.history.map( (entry, index) => {
      //console.log('expression: '+ entry.expression);
      // console.log('result: '+ entry.result);
      let expression = entry.expression;
      let result = entry.result;
      if (!expression) return;

      let resultDisplay;
      if (result === 'Error') {
        resultDisplay = <div>{result}</div>;
      } else {
        resultDisplay = <button onClick={() => this.handleHistory(result)}>{result}</button>;
      }

      return (
        <div key={index} className='entry'>
          <button onClick={() => this.handleHistory(expression)}>{expression}</button>
          {resultDisplay}
        </div>
      );
    });

    // TODO factorial
    // TODO summation

    return (
      <div>
        <Screen display={this.state.display} history={history}/>
        <Keypad onDigit={(digitNum, type) => this.handleDigit(digitNum, type)}/>
        <button
          onClick={() => this.handleEnter()}>
          Enter
        </button>
        <button
          onClick={() => this.handleBackspace()}>
          Backspace
        </button>
        <button
          onClick={() => this.handleClear()}>
          Clear
        </button>
      </div>

    );
  }
}

export default Calculator;
