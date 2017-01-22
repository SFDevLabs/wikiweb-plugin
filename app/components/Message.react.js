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
      <div className={'errorMessages'}>
        { messages.map((message, i) => <span key={i}>Error: {message}</span>)}
      </div>
    );
  }
}

export default Message;
