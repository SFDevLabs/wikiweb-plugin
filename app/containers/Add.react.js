import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchConnectSearch, resetConnectSearch } from '../actions/connectedPage';
import _ from 'lodash';
import { isWebUri } from 'valid-url';

const TYPING_DELAY = 1110;

const mapStateToProps = (state) => {
  const {
    connectEntity:
      { id,
        title,
        isURL,
        parseSuccess,
        isFetching,
        messages,
      },
      currentPage,
  } = state;
  const tabId = currentPage.tabId;

  return {
    id,
    title,
    isURL,
    isFetching,
    tabId,
    messages,
    parseSuccess,
  };
};

class Add extends Component {

  static propTypes = {
    isURL: PropTypes.bool.isRequired,
    parseSuccess: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      isInput: false,
      description: '',
      val: '',
      tags: [],
      typeDelay: false,
    };
    this.submitWithDelay = _.debounce(this.submitWithDelay, TYPING_DELAY);
  }

  submitWithDelay = () => {
    const { val } = this.state;
    //@TODO clean this code up.
    // const isValidURL = isWebUri(val) || isWebUri(`https://${val}`);
    this.setState({
      // isValidURL,
      typeDelay: false,
    });
    // if (isValidURL) {
      this.onRecieveValidURL(val);
    // }
  }

  onChange = (e) => {
    const { dispatch } = this.props;
    const val = e.target.value;
    this.setState({
      val,
      typeDelay: true,
    });
    dispatch(resetConnectSearch(val));
    this.submitWithDelay();
  }

  onRecieveValidURL = (val) => {
    const { dispatch } = this.props;
    dispatch(fetchConnectSearch(val));
  }

  onTagChange = (tags) => {
    this.setState({
      tags,
    });
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState({
      description,
    });
  }

  render() {
    const { val, typeDelay } = this.state;
    const { isFetching, isURL, parseSuccess } = this.props;
    const formInputClass = isURL && parseSuccess && !isFetching && !typeDelay ? '' : 'invalidSubmit';
    const formInputOnClick = isURL && parseSuccess && !isFetching && !typeDelay ?
      this.props.onSave :
      (e) => { e.preventDefault(); };

    const inputURLColor = // Box is white when
      (isURL && parseSuccess) || // server tells us input value is valid
      isFetching || // is waiting for the server
      typeDelay || // is pausing for the user to stop typing
      val.length === 0 // There is no input value
        ? 'rgba(0,0,0,.44)'
        : 'red'; // Otherwise make the color red.

    return (
      <form
        className={'urlSubmitForm'}
      >
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

        <input
          type="submit"
          value="Submit"
          className={`inputSubmit ${formInputClass}`}
          onClick={formInputOnClick}
        />
      </form>
    );
  }

}

export default connect(mapStateToProps)(Add);
