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
  }

  render() {
    const { isLoggedIn, entityCount } = this.props;

    const WikiWebBox = entityCount < 4 ?
      (<span className={'footerButton'} >
        <div className={'wikiWebBox'} onClick={function () { chrome.tabs.create({ url: 'https://wikiweb.org' }); }}>
          <span>WikiWeb</span>
        </div>
      </span>) :
      (<span className={'footerButton'} >
        <div className={'wikiWebBox'} onClick={function () { chrome.tabs.create({ url: `https://wikiweb.org/node/${entityId}` }); }}>
          <span>See more...</span>
        </div>
      </span>);
    return (
      <div className={'footer'}>
        <WikiWebBox />
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
