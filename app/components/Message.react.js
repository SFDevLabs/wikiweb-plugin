import React, { Component, PropTypes } from 'react';

class Message extends Component {

  static propTypes = {
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }).isRequired
    ),
  }

  render() {
    const { messages } = this.props;
    const ResponseJSX = messages ? (
      <div className={'errorMessages'} style={{ display: 'block' }}>
        {messages.map((message, i) => <span key={i}>
          <span className={'type'}>{message.type}: </span>
          <span className={'text'}>{message.text}</span>
        </span>)}
      </div>) : null;

    return (
      <div>{ ResponseJSX }</div>
    );
  }
}

export default Message;
