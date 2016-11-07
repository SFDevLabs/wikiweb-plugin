import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import style from './App.css';

@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class App extends Component {

  constructor() {
    super()
    this.state = {tabURL: ''}
  }

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentWillMount() {
    const that = this;
    chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
          that.setState({tabURL: tabs[0].url.split('?')[0]})
      });
  }

  render() {
    const { todos, actions } = this.props;
    const { tabURL } = this.state;

    return (
      <div>
        <div style={{display:'block', marginTop: '10px'}}>

          <div style={{float: 'left', marginLeft: '10px', marginRight: '10px', height: '100px'}}>
            <div style={{height: '48px', width: '48px', backgroundColor: 'brown', borderRadius: '4px'}}>
            </div>
          </div>

          <div style={{float: 'left', height: '100px' }}>
            <div>
              <p style={{margin: 0, padding: 0}}>Title</p>
              <p style={{margin: 0, padding: 0}}>Description</p>
              <p style={{margin: 0, padding: 0}}>{tabURL}</p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
