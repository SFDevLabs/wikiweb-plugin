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
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className={'footer'} style={{ position: 'absolute', bottom: 0, paddingTop: 1, borderTop: '1px solid #DCDCDC', height: 40, display: 'block' }}>
        <Link to="/" style={{ lineHeight: '40px', textDecoration: 'none', color: '#4d4d4d', outline: 'none' }}>
          <div className={'wikiwebBox'} style={{ width: '174.5px', float: 'left', fontSize: 14, textAlign: 'center', outline: 'none' }}>
            <span>WikiWeb</span>
          </div>
        </Link>
        <div className={'verticalDivider'}>{' '}</div>
        <Link to={isLoggedIn ? 'add' : 'login'} style={{ lineHeight: '40px', textDecoration: 'none', color: '#4d4d4d' }}>
          <div className={'addConnectionBox'} style={{ width: '174.5px', float: 'right', textAlign: 'center' }}>
            <strong><span>+</span></strong>
          </div>
        </Link>
      </div>);
  }
}

export default connect(mapStateToProps)(Footer);
