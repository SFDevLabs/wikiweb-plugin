import React, { Component } from 'react';
import { Link } from 'react-router';
import InputUrl from '../components/InputUrl.react';
import InputTags from '../components/InputTags.react';

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
      val: e.target.val,
    });
  }

  render() {
    return (
      <div className={'addJS'} style={{ minHeight: 266, paddingTop: 4, fontFamily: 'Verdana, Geneva, sans-serif', color: '#000000', borderTop: '3px solid #70037C' }}>
        <Link to="/" style={{ textDecoration: 'none' }} ><span style={{ paddingLeft: 6, paddingRight: 6, fontSize: 24, color: '#70037C' }} >&#8592;</span></Link>
        <div style={{ paddingLeft: '7%', paddingTop: 3, width: '100%' }} >
          <form >
            <InputUrl />
            <textarea className={'formInput'} placeholder="Description..." style={{ marginBottom: 7, height: 50, lineHeight: '20px', paddingTop: 8 }} />
            <InputTags />
            <div style={{ marginTop: 10 }}>
              <button className={'formSubmit'} type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default Add;
