import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Calculator from './Calculator';


class Enter extends React.Component {


  render() {
    return (
      <button
        onClick={this.props.onEnter}>
        {this.props.value}
      </button>
    )
  }
}

export default Enter;
