import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchConnectSearch, fetchPostEdge } from '../actions/entity';

const TYPING_DELAY = 1110;

const mapStateToProps = (state) => {
  const {
    connectEntity:
      { id,
        title,
        isURL,
      },
      entity,
  } = state;

  const fromId = entity.id;
  return {
    id,
    fromId,
    title,
    isURL,
  };
};

class InputUrl extends Component {

  static propTypes = {
    isURL: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    fromId: PropTypes.string.isRequired,
  }

  constructor() {
    super();
    this.submitWithDelay = _.debounce(this.submitWithDelay, TYPING_DELAY);
  }

  onKeyDown = (e) => {
    this.submitWithDelay(e.target.value);
  }

  onSubmit = () => {
    const { dispatch, id, fromId } = this.props;
    dispatch(fetchPostEdge(fromId, id));
  }

  submitWithDelay = (val) => {
    const { dispatch } = this.props;
    dispatch(fetchConnectSearch(val));
  }

  render() {
    const {
      id,
      title,
      isURL,
    } = this.props;
    return (
      <div>
        Data is Printing
        <br />
        Is this a URL? {isURL.toString()}
        <br />
        {id} and {title} from API
        <br />
        <input onChange={this.onKeyDown} className={'formInput'} placeholder="URL..." style={{ marginBottom: 10 }} />
        <input type="button" onClick={this.onSubmit} value="Working Submit Remove Me"/>
      </div>
    );
  }

}

export default connect(mapStateToProps)(InputUrl);
