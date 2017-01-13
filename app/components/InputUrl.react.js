import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { isUri } from 'valid-url';

const TYPING_DELAY = 1110;

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
    const isValidURL = isUri(val);
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
    } = this.props;

    const {
      val,
      isValidURL,
      typeDelay,
    } = this.state;

    const inputUrlStatusImg = isExistantURL && isValidURL ? 'img/confirmation_tick.png' : 'img/error_cross.png';
    const inputUrlStatusText = isExistantURL && isValidURL ? 'Page exists' : 'Page does not exist';
    const inputConfirmationImg = typeDelay || isFetching ?
      null :
      (<span style={{ display: 'inline-block', marginLeft: -27, marginBottom: -3 }}>
        <img alt="" src={inputUrlStatusImg} style={{ width: 15 }} title={inputUrlStatusText} />
      </span>);


    return (
      <div>
        <div style={{ display: 'block' }}>
          <input
            onChange={this.onChange}
            value={val}
            className={'formInput'}
            placeholder="Paste URL..."
            style={{ marginBottom: 10 }}
          />
          {inputConfirmationImg}
        </div>
      </div>
    );
  }

}

export default InputUrl;
