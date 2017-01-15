import React, { Component } from 'react';
import { Link } from 'react-router';

class Footer extends Component {
  render() {
    return (
      <div className={'footer'} style={{ position: 'absolute', bottom: 0, paddingTop: 1, borderTop: '1px solid #DCDCDC', height: 40, display: 'block' }}>
        <Link to="add" style={{ lineHeight: '40px', textDecoration: 'none', color: '#4d4d4d', outline: 'none' }}>
          <div className={'wikiwebBox'} style={{ width: '174.5px', float: 'left', fontSize: 14, textAlign: 'center', outline: 'none' }}>
            <span>WikiWeb</span>
          </div>
        </Link>
        <div className={'verticalDivider'}>{' '}</div>
        <Link to="add" style={{ lineHeight: '40px', textDecoration: 'none', color: '#4d4d4d' }}>
          <div className={'addConnectionBox'} style={{ width: '174.5px', float: 'right', textAlign: 'center' }}>
            <strong><span>+</span></strong>
          </div>
        </Link>
      </div>);
  }
}

export default Footer;
