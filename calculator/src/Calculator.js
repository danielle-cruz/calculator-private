import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Screen from './Screen';
import Digit from './Digit';
import Operation from './Operation';
import Enter from './Enter';

import  {evaluate} from './evaluate.js'



class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      lastSeen: null,
      history: [{
        'expression': 100,
        'result': 200
      }]
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
    if (type === 'operation') {
      if (this.state.lastSeen === 'operation') return;
      digitNum = (this.state.lastSeen? ' ' : '0 ') + digitNum + ' ';
    }
    this.setState({
      display: this.state.display + `${digitNum}`,
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
      display: result,
      history: history.concat([{
        expression: expression,
        result: result,
      }]),
    });
  }

  render() {

    console.log(this.state.history);
    const history = this.state.history.map(entry => {
      console.log('expression: '+ entry.expression);
      console.log('result: '+ entry.result);

      return (
        <li>
          {entry.result}
        </li>
      );
    });


    return (
      <div>
        <Screen display={this.state.display}/>
        {this.renderDigit('0', 'digit')}
        {this.renderDigit('1', 'digit')}
        {this.renderDigit('2', 'digit')}
        {this.renderDigit('.', 'decimal')}
        {this.renderDigit('+', 'operation')}
        {this.renderDigit('x', 'operation')}
        <Enter value={'Enter'} onEnter={() => this.handleEnter()} />

        {/*<Digit value={'1'} onDigit={() => this.handleDigit('1')}/>
        <Digit value={'2'} onDigit={() => this.handleDigit('2')}/>
        <Digit value={'+'} onDigit={() => this.handleDigit(' + ')}/>*/}
        <ol>{history}</ol>
      </div>

    );
  }
}

export default Calculator;
