import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

class Screen extends React.Component {

  render() {
    return (
      <div className='screen'>
        {this.props.history}
        <div className='display'>{this.props.display}</div>
      </div>
    );
  }
}

export default Screen;
