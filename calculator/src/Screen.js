import React from 'react';
import './styles.css';
import  {pemdasEvaluate} from './evaluate.js'

/* Screen
 * Contains the current display of the expression being computed, as well as
 * the history of all previous computations (including their expressions and
 * corresponding results) */

class Screen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      upperLimit: 10,
      lowerLimit: 0,
      function: 'i',
    }

    /* Event handlers */
    this.handleUpperLimit = this.handleUpperLimit.bind(this);
    this.handleLowerLimit = this.handleLowerLimit.bind(this);
    this.handleFunction = this.handleFunction.bind(this);
    this.handleSummation = this.handleSummation.bind(this);
  }

  /* Render Entry: For values of past computations in the calculator history,
   * create a button for valid inputs which can be replicated. Create a static
   * text display for invalid inputs which resulted in error. */
  renderEntry(value) {
    if (value === 'Error') {
      return (
        <div>{value}</div>
      );
    }
    return (
      <button
        onClick={() => this.props.onHistory(value)}>
        {value}
      </button>
    );
  }

  /* Render History: Display the entries of all  past computations, including
   * their expressions and corresponding results */
  renderHistory() {
    const history = this.props.history.map( (entry, index) => {
      let expression = entry.expression;
      let result = entry.result;

      return (
        <div key={index} className='entry'>
          {this.renderEntry(expression)}
          {this.renderEntry(result)}
        </div>
      );
    });

    return history;
  }

  /*** Event Handlers ***/
  /* Event Handler: Updates the upper limit for summation to the value of the text input */
  handleUpperLimit(event) {
    this.setState({upperLimit: event.target.value});
    console.log(this.state);
  }

  /* Event Handler: Updates the lower limit for summation to the value of the text input */
  handleLowerLimit(event) {
    this.setState({lowerLimit: event.target.value});
    console.log(this.state);
  }

  /* Event Handler: Updates the inner function for summation to the value of the text input */
  handleFunction(event) {
    this.setState({function: event.target.value});
    console.log(this.state);
  }

  /* Event Handler: Calculate the sum of the summation with the given upper
   * limit, lower limit, and inner function. Callback to Calculator to update
   * the display */
  handleSummation(event) {
    event.preventDefault();
    let end = this.state.upperLimit;
    let start = this.state.lowerLimit;
    let sum = 0;
    for (let i = start; i <= end; i++ ) {
      let current = this.state.function.replaceAll('i', i.toString());
      sum += Number(pemdasEvaluate(current));
    }
    this.props.summationCallback(
      this.state.upperLimit,
      this.state.lowerLimit,
      this.state.function,
      sum);
  }

  renderDisplay() {
    if (!this.props.isSummation) {
      return (
        <div className='display'>{this.props.display}</div>
      )
    }
    return (
      <div>
      <form onSubmit={this.handleSummation}>
        <label>
          Upper Limit:
          <input type='number' min='0' step='1'
            value={this.state.upperLimit}
            onChange={this.handleUpperLimit} />
        </label>
        <label>
          Lower Limit:
          <input type='number' min='0' step='1'
            value={this.state.lowerLimit}
            onChange={this.handleLowerLimit} />
        </label>
        <label>
          Function to sum (in terms of i with spaces between operators +,-,x,/):
          <input type='text'
            value={this.state.function}
            onChange={this.handleFunction} />
        </label>
        <input type="submit" value="Calculate" />
      </form>
      </div>
    );
  }

  render() {
    return (
      <div className='screen'>
        {this.renderHistory()}
        {this.renderDisplay()}
      </div>
    );
  }
}

export default Screen;
