import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { user:
    { isLoggedIn,
    },
  } = state;

  return {
    isLoggedIn,
  };
};

class Footer extends Component {

  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    entityCount: PropTypes.number.isRequired,
    id: PropTypes.number,
  }

  render() {
    const { isLoggedIn, entityCount, id } = this.props;

    const WikiWebBox = entityCount < 4 ?
      (<div className={'wikiWebBox'} onClick={function () { chrome.tabs.update(null, { url: 'https://wikiweb.org' }); }}>
        <span>WikiWeb</span>
      </div>) :
      (<div className={'wikiWebBox'} onClick={function () { chrome.tabs.update(null, { url: `https://wikiweb.org/node/${id}` }); }}>
        <span>See more...</span>
      </div>);
    return (
      <div className={'footer'}>
        <span className={'footerButton'}>
          {WikiWebBox}
        </span>
        <div className={'verticalDivider'}>{' '}</div>
        <Link to={isLoggedIn ? 'add' : 'login'} className={'footerButton'}>
          <div className={'addConnectionBox'}>
            <strong><span>+</span></strong>
          </div>
        </Link>
      </div>);
  }
}

export default connect(mapStateToProps)(Footer);
