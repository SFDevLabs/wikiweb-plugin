import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import InputUrl from '../components/InputUrl.react';
import InputTags from '../components/InputTags.react';
import { fetchConnectSearch, fetchPostEdge } from '../actions/entity';

const mapStateToProps = (state) => {
  const {
    connectEntity:
      { id,
        title,
        isURL,
        isFetching,
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
  };
};

class Add extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    fromId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  constructor() {
    super();

    this.state = {
      isInput: false,
    };
  }

  onRecieveValidURL = (val) => {
    const { dispatch } = this.props;
    dispatch(fetchConnectSearch(val));
  }

  onSave = () => {
    const { dispatch, id, fromId } = this.props;
    dispatch(fetchPostEdge(fromId, id));
  }

  render() {
    const { id, isFetching } = this.props;
    return (
      <div className={'addJS'} style={{ minHeight: 266, paddingTop: 4, fontFamily: 'Verdana, Geneva, sans-serif', color: '#000000', borderTop: '3px solid #70037C' }}>
        <Link to="/" style={{ textDecoration: 'none' }} ><span style={{ paddingLeft: 6, paddingRight: 6, fontSize: 24, color: '#70037C' }} >&#8592;</span></Link>
        <div style={{ paddingLeft: '7%', paddingTop: 5, width: '100%' }} >
          <form >
            <InputUrl
              onValidURL={this.onRecieveValidURL}
              isFetching={isFetching}
              isExistantURL={id.length > 0}
            />
            <textarea className={'formInput'} placeholder="Description..." style={{ marginBottom: 7, height: 70, lineHeight: '20px', paddingTop: 8 }} />
            <InputTags />
            <div style={{ marginTop: 10 }}>
              <a onClick={this.onSave} className={'formSubmit'} type="submit" >Submit</a>
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps)(Add);
