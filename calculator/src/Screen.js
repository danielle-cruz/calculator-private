import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

class Screen extends React.Component {

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

  renderDisplay() {
    return (
      <div className='display'>{this.props.display}</div>
    )
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
