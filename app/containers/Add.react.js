import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InputUrl from '../components/InputUrl.react';
import InputTags from '../components/InputTags.react';
import { fetchConnectSearch } from '../actions/edge';

const mapStateToProps = (state) => {
  const {
    connectEntity:
      { id,
        title,
        isURL,
        isFetching,
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


  /* TODO isFetching currently removed... needs to be added back to account for server lag on live product */
  //<span>{ isFetching ? 'isFetching' : null }</span>
  render() {
    const { id, isFetching, isURL } = this.props;
    const { tags, description } = this.state;
    const formInput = isURL ? 
      (<input 
          type="submit" 
          value="Submit" 
          className={'inputSubmit'} 
          onClick={this.props.onSave} 
        />) :
      (<input 
          type="submit" 
          value="Submit" 
          className={'inputSubmit invalidSubmit'} 
          onClick={""} 
        />)

    return (
      <form
        className={'urlSubmitForm'} 
      >
        <InputUrl
          onValidURL={this.onRecieveValidURL}
          isFetching={isFetching}
          isExistantURL={id.length > 0}
          style={{ position: 'absolute', bottom: 0 }}
        />
        {formInput}
      </form>
    );
  }

}

export default connect(mapStateToProps)(Add);

function submitUrlConnection(e) {
 console.log('submitUrlConnection function')
}
