import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Screen from './Screen';
import Digit from './Digit';
import Operation from './Operation';
import Enter from './Enter';

import  {evaluate, backspace} from './evaluate.js'


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      lastSeen: null,
      lastAnswer: '0',
      history: []
    }
  }

  renderDigit(digitNum, type) {
    return (
      <Digit
        value={digitNum}
        onDigit={() => this.handleDigit(digitNum, type)}
      />
    );
  }

  handleDigit(digitNum, type) {
    // alert(`${this.props.value} clicked!`)
    console.log(this.state)
    if (type === 'operation') {
      if (this.state.lastSeen === 'operation') {
        return;
      } /*else if (!this.state.lastSeen && !this.state.lastAnswer) {
        digitNum = '0 ' + digitNum + ' ';
      } */
      else if (!this.state.lastSeen && this.state.display === '') {
        digitNum = this.state.lastAnswer + ' ' + digitNum + ' ';
      } else {
        digitNum = ' ' + digitNum + ' ';
      }
    }

    if (type === 'decimal') {
      if (this.state.lastSeen === 'decimal') return;
    }

    this.setState({
      display: this.state.display !== 'undef' ? this.state.display + `${digitNum}` : `${digitNum}`,
      lastSeen: type
    });
    console.log(digitNum);
  }

  handleEnter() {
    // console.log(this.state.display)
    // alert(this.state.display)
    if (this.state.lastSeen === 'operation') return;

    let expression = this.state.display;
    let result = evaluate(this.state.display);

    const history = this.state.history.slice();

    this.setState({
      display: result !== 'undef' ? result : '0',
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
      display: newExpression,
      lastSeen: lastType,
      lastAnswer: '0',
    });
    console.log(this.state.lastSeen)
  }

  handleClear() {
    this.setState({
      display: '',
      lastSeen: null,
      lastAnswer: '0',
    });
  }

  handleHistory(historyValue) {
    this.setState({
      display: historyValue
    })
  }

  render() {

    console.log(this.state.history);
    const history = this.state.history.map(entry => {
      //console.log('expression: '+ entry.expression);
      // console.log('result: '+ entry.result);
      let expression = entry.expression;
      let result = entry.result;
      if (!expression) return;

      let resultDisplay;
      if (result === 'undef') {
        resultDisplay = <div>{result}</div>;
      } else {
        resultDisplay = <button onClick={() => this.handleHistory(result)}>{result}</button>;
      }

      return (
        <div className='entry'>
          <button onClick={() => this.handleHistory(expression)}>{expression}</button>
          {resultDisplay}
        </div>
      );
    });


    // TODO backspace button
    // TODO clear button
    // TODO factorial
    // TODO summation

    return (
      <div>
        <Screen display={this.state.display} history={history}/>
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
        <Enter value={'Enter'} onEnter={() => this.handleEnter()} />
        <button
          onClick={() => this.handleBackspace()}>
          Backspace
        </button>
        <button
          onClick={() => this.handleClear()}>
          Clear
        </button>

        {/*<Digit value={'1'} onDigit={() => this.handleDigit('1')}/>
        <Digit value={'2'} onDigit={() => this.handleDigit('2')}/>
        <Digit value={'+'} onDigit={() => this.handleDigit(' + ')}/>*/}
      </div>

    );
  }
}

export default Calculator;
