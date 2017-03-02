import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InputUrl from '../components/InputUrl.react';
import InputTags from '../components/InputTags.react';
import Message from '../components/Message.react';
import { fetchConnectSearch } from '../actions/edge';

const mapStateToProps = (state) => {
  const {
    connectEntity:
      { id,
        title,
        isURL,
        isFetching,
        messages,
      },
      currentPage,
  } = state;

  const fromId = currentPage.id;
  const tabId = currentPage.tabId;

  return {
    id,
    fromId,
    title,
    isURL,
    isFetching,
    messages,
    tabId,
  };
};

class Add extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    isURL: PropTypes.bool.isRequired,
    fromId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    messages: PropTypes.array,
    onSave: PropTypes.func.isRequired
  }

  constructor() {
    super();

    this.state = {
      isInput: false,
      isURL: false,
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
    const { id, isFetching, isURL, messages } = this.props;
    const { tags, description } = this.state;
    const isValidSubmit = isURL ? 'formSubmit' : 'formSubmit invalidSubmit';
    return (
      <form id='urlSubmitForm' className={'activeUrlSubmitForm urlSubmitForm'} style={{ display: 'flex', flexDirection: 'row', marginBottom: 0 }} >
        <Message messages={messages} /><span>{isFetching?'isFetching':null} - {}</span>
          <InputUrl
            onValidURL={this.onRecieveValidURL}
            isFetching={isFetching}
            isExistantURL={id.length > 0}
            style={{ position: 'absolute', bottom: 0 }}
          />

          <input type="submit" value="Submit" className={'inputSubmit ' + isValidSubmit} onClick={this.props.onSave} style={{ height: 26 }} />
      </form>
    );
  }

}

export default connect(mapStateToProps)(Add);

function submitUrlConnection(e) {
 console.log('submitUrlConnection function')
}
