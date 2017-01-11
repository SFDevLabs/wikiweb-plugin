import React, { Component } from 'react';
import { Link } from 'react-router';

class Add extends Component {

  static propTypes = {

  }

  constructor() {
    super();
    this.state = {
      val: '',
    };
  }

  onKeyDown = (e) => {
    this.setState({
      val: e.target.val
    });
  }

  render() {
    return (
      <div className={'addJS'} style={{ minHeight: 266, paddingTop: 4, fontFamily: 'Verdana, Geneva, sans-serif', color: '#000000', borderTop: '3px solid #70037C' }}>
        <Link to="/" style={{ textDecoration: 'none' }} ><span style={{ paddingLeft: 6, paddingRight: 6, fontSize: 24, color: '#70037C' }} >&#8592;</span></Link>
        <div style={{ paddingLeft: '7%', paddingTop: 5, width: '100%' }} >
          <form >
            <input className={'formInput'} placeholder="URL..." style={{ marginBottom: 10 }} />
            <textarea className={'formInput'} placeholder="Description..." style={{ marginBottom: 7, height: 70, lineHeight: '20px', paddingTop: 8 }} />
            <input className={'formInput'} placeholder="Tags" style={{ marginBottom: 10 }} />
            <div>
              <input className={'formSubmit'} type="submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default Add;
