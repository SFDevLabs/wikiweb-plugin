import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { isWebUri } from 'valid-url';

const TYPING_DELAY = 1110;

const mapStateToProps = (state) => {
  const { edge } = state;
  const messages = edge.messages;
  return { messages };
}

class InputUrl extends Component {

  static propTypes = {
    isExistantURL: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onValidURL: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      val: '',
      isValidURL: false,
    };
    this.submitWithDelay = _.debounce(this.submitWithDelay, TYPING_DELAY);
  }

  onChange = (e) => {
    const val = e.target.value;
    this.setState({
      val,
      typeDelay: true,
    });
    this.submitWithDelay();
  }

  submitWithDelay = () => {
    const { val } = this.state;

    const isValidURL = isWebUri(val) || isWebUri(`https://${val}`);
    this.setState({
      isValidURL,
      typeDelay: false,
    });
    if (isValidURL) {
      this.props.onValidURL(val);
    }
  }

  render() {
    const {
      isExistantURL,
      isFetching,
      messages,
    } = this.props;

    const {
      val,
      isValidURL,
      typeDelay,
    } = this.state;

    // const inputUrlStatusImg = isExistantURL && isValidURL ? 'img/confirmation_tick.png' : 'img/error_cross.png';
    // const inputUrlStatusText = isExistantURL && isValidURL ? 'Page exists' : 'Page does not exist';
    // const inputConfirmationImg = val.length === 0 || typeDelay || isFetching ?
    //   null :
    //   (<span style={{ display: 'inline-block', marginLeft: -27 }}>
    //     {inputUrlStatusText}
    //   </span>);

    const inputURLColor = (messages.length && (messages[0].type === "warning" || messages[0].type === "error")) ?
      'red' : 'rgba(0,0,0,.44)';

    return (
      <div>
        <input
          type="text"
          id="inputUrl"
          name="inputBox goes here"
          placeholder="Add Connection"
          className={'inputUrl'}
          autoFocus
          onChange={this.onChange}
          value={val}
          style={{ height: 26, color: inputURLColor }}
        />
      </div>
    );
  }

}

export default connect(mapStateToProps)(InputUrl);