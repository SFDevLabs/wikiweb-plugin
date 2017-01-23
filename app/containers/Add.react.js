import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
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
  return {
    id,
    fromId,
    title,
    isURL,
    isFetching,
    messages,
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
    const { dispatch, id, fromId } = this.props;
    const { description, tags } = this.state;
    dispatch(fetchPostEdge(
      fromId,
      id,
      description,
      tags.map(obj => obj.text)
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
      <div className={'addJS'}>
        <Link to="/" className={'backButton'}>
          <span>&#8592;</span>
        </Link>
        <div style={{ paddingLeft: '7%', paddingTop: 3 }}>
          <form style={{ width: 301 }}>
            <Message messages={messages} />
            <InputUrl
              onValidURL={this.onRecieveValidURL}
              isFetching={isFetching}
              isExistantURL={id.length > 0}
            />
            <textarea
              value={description}
              onChange={this.onDescriptionChange}
              className={'formInput textArea'}
              placeholder="Description: why is this connection relevant or interesting? (optional)"
              style={{ marginBottom: 7, height: 70, lineHeight: '20px', paddingTop: 8 }}
            />
            <InputTags
              tags={tags}
              onTagChange={this.onTagChange}
            />
            <div style={{ marginTop: 10, marginBottom: 12 }}>
              <a onClick={this.onSave} className={isValidSubmit} type="submit">Submit</a>
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps)(Add);
