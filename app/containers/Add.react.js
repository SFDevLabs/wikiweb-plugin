import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InputUrl from '../components/InputUrl.react';
import { fetchConnectSearch } from '../actions/connectedPage';

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
      tags: [],
    };
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
    const { isFetching, isURL, parseSuccess } = this.props;
    const formInputClass = isURL && parseSuccess ? '' : 'invalidSubmit';
    const formInputOnClick = isURL && parseSuccess ?
      this.props.onSave :
      (e) => { e.preventDefault(); };

    return (
      <form
        className={'urlSubmitForm'}
      >
        <InputUrl
          onValidURL={this.onRecieveValidURL}
          isValid={isURL && parseSuccess}
          isFetching={isFetching}
          style={{ position: 'absolute', bottom: 0 }}
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
