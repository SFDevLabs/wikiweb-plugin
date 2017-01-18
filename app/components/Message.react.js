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
    return (
      <div className={'message'} style={{ display: 'block' }}>
        {messages.map((message, i) => <p key={i}>Type: {message.type} Text: {message.text}</p>)}
      </div>);
  }
}

export default Message;
