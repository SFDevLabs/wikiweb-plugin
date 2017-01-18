import React, { Component, PropTypes } from 'react';

class Message extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired
  }

  render() {
    const { messages } = this.props;
    return (
      <div className={'message'} style={{ display: 'block' }}>
        {messages.map(message => <p>{message}</p>)}
      </div>);
  }
}

export default Message;
