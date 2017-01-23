import React, { Component, PropTypes } from 'react';

class Message extends Component {

  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired
  ),
  }

  render() {
    const { messages } = this.props;
    console.log(this.props, 'this.props from message');
    return (
      <div className={'errorMessages'} style={{ display: 'block' }}>
        {messages.map((message, i) => <span key={i}>
          <span className={'type'}>{message.type}: </span>
          <span className={'text'}>{message.text}</span>
        </span>)}
      </div>);
  }
}

export default Message;
