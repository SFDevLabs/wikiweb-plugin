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
    // title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    fromId: PropTypes.string.isRequired,
  }

  constructor() {
    super();
    this.submitWithDelay = _.debounce(this.submitWithDelay, TYPING_DELAY);
    this.state = {
      isInput: false,
    };
  }

  onKeyDown = (e) => {
    this.submitWithDelay(e.target.value);
    const isInput = e.target.value.length > 0;
    this.setState({
      isInput,
    });
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
      // id,
      // title,
      isURL,
    } = this.props;

    const { isInput } = this.state;
    const inputUrlStatusImg = isURL ? 'img/confirmation_tick.png' : 'img/error_cross.png';
    const inputUrlStatusText = isURL ? 'URL is valid' : 'URL is invalid';
    const inputConfirmationImg = isInput ?
      (<span style={{ display: 'inline-block', marginLeft: -27, marginBottom: -3 }}>
        <img alt="" src={inputUrlStatusImg} style={{ width: 15, float: 'left' }} title={inputUrlStatusText} />
      </span>) :
      <span>{' '}</span>;

    return (
      <div>
        <div style={{ display: 'block' }}>
          <span style={{ display: 'inline-block' }}>
            <input onChange={this.onKeyDown} className={'formInput'} placeholder="Paste URL..." style={{ marginBottom: 10 }} />
          </span>
          {inputConfirmationImg}
        </div>

      </div>
    );
  }

}

export default connect(mapStateToProps)(InputUrl);
