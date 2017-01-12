import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchConnectSearch } from '../actions/entity';

const TYPEING_DELAY = 1110;
const hardCodedExampleURL = 'https://newrepublic.com/article/139707/republicans-think-capitol-hills-rules-suckers';

const mapStateToProps = (state) => {
  const { connectEntity:
    { id,
      title,
      isURL,
    },
  } = state;

  return {
    id,
    title,
    isURL,
  };
};

class InputUrl extends Component {

  constructor() {
    super();
    this.submitWithDelay = _.debounce(this.submitWithDelay, TYPEING_DELAY);
  }
  static propTypes = {
    isURL: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }

  submitWithDelay = (val) => {
    const { dispatch } = this.props;
    dispatch(fetchConnectSearch(val));
  }

  onKeyDown = (e) => {
    this.submitWithDelay(e.target.value)
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
      </div>
    );
  }

}

export default connect(mapStateToProps)(InputUrl);
