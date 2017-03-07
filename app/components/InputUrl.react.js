import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { isWebUri } from 'valid-url';

const TYPING_DELAY = 1110;

class InputUrl extends Component {

  static propTypes = {
    isValid: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onValidURL: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      val: ''
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
      isValid,
      isFetching,
    } = this.props;

    const {
      val,
      typeDelay,
    } = this.state;

    // const inputUrlStatusImg = isExistantURL && isValidURL ? 'img/confirmation_tick.png' : 'img/error_cross.png';
    // const inputUrlStatusText = isExistantURL && isValidURL ? 'Page exists' : 'Page does not exist';
    // const inputConfirmationImg = val.length === 0 || typeDelay || isFetching ?
    //   null :
    //   (<span style={{ display: 'inline-block', marginLeft: -27 }}>
    //     {inputUrlStatusText}
    //   </span>);

    /*
    * Becuase we need these checks to make the input text red
    * only when the server has responded that the URL is not valid.
    */
    const inputURLColor =
      val.length > 0 && // input has a value
      !isValid && // server tells us input value is valid
      !isFetching && // is not waiting for the server
      !typeDelay // is not pausing for the user to stop typing
      ? 'red'
      : 'rgba(0,0,0,.44)'; // @todo make these classes
    const spinner = isFetching || typeDelay ?<span style={{ position:'absolute' }}>*</span>:null;
    return (
      <div>
        <input
          autoComplete="off"
          type="text"
          name="inputBox goes here"
          placeholder="What should people read next?"
          className={'inputUrl'}
          autoFocus
          onChange={this.onChange}
          value={val}
          style={{ height: 26, color: inputURLColor }}
        />
        {spinner}
      </div>
    );
  }

}

export default InputUrl;
