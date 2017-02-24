import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InputUrl from '../components/InputUrl.react';
import InputTags from '../components/InputTags.react';
import Message from '../components/Message.react';
import { fetchConnectSearch, fetchPostEdge } from '../actions/edge';

const mapStateToProps = (state) => {
  const {
    connectEntity:
      { id,
        title,
        isURL,
        isFetching,
        messages,
      },
      entity,
  } = state;

  const fromId = entity.id;
  const tabId = entity.tabId;

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
    tabId: PropTypes.number.isRequired,
    isURL: PropTypes.bool.isRequired,
    fromId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    messages: PropTypes.array,
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

  onSave = () => {
    submitUrlConnection(); // TODO needs a refactor based on conditionals.
    const { dispatch, id, fromId, tabId } = this.props;

    const { description, tags } = this.state;
    dispatch(fetchPostEdge(
      fromId,
      id,
      description,
      tags.map(obj => obj.text),
      tabId,
    ));
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
      <form id='urlSubmitForm' className={'inactiveUrlSubmitForm'} style={{ display: 'flex', flexDirection: 'row' }} >
        <div style={{ display: 'inline-block' }}>
          <Message messages={messages} />
          <InputUrl
            onValidURL={this.onRecieveValidURL}
            isFetching={isFetching}
            isExistantURL={id.length > 0}
          />
        </div>
        <input type="submit" value="Submit" className={'inputSubmit ' + isValidSubmit} onClick={this.onSave} />
      </form>
    );
  }

}

export default connect(mapStateToProps)(Add);

function submitUrlConnection(e) {
  var urlSubmitForm = document.getElementById('urlSubmitForm');
    if (urlSubmitForm.classList.contains('activeUrlSubmitForm')) {
      urlSubmitForm.classList.remove('activeUrlSubmitForm');
      urlSubmitForm.classList += ' inactiveUrlSubmitForm';
    }
}
