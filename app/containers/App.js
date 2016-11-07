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

    const dataBlob = {
      total_related_sites: 10,
      related_sites: [
        {
          title: 'Harvard University',
          description: 'Harvard University is devoted to excellence in teaching, learning, and research, and to developing leaders in many disciplines who make a difference globally.',
          url: 'www.harvard.edu/',
          wikiweb_url: 'http://wikiweb.com/?www.harvard.edu/',
          tags: ['University', 'Ivy League'],
          img: '',
          connected_by: [
            {
              username: '@mceoin',
              url: 'https://twitter.com/mceoin',
              img: 'https://pbs.twimg.com/profile_images/3225622932/54e5450cc9e5b3522145fc323006bea8_400x400.jpeg'
            }
          ],
        },
        {
          title: 'Stanford University',
          description: 'Stanford University is one of the world&#39;s leading research and teaching institutions. It is located in Stanford, California.',
          url: 'www.stanford.edu/',
          wikiweb_url: 'http://wikiweb.com/?www.stanford.edu/',
          tags: ['University', 'California', 'VC'],
          img: '',
          connected_by: [
            {
              username: '@jeffj',
              url: 'https://twitter.com/jeffj',
              img: 'https://pbs.twimg.com/profile_images/698659281667645440/n97dQ5Ea_400x400.jpg'
            }
          ],
        },
        {
          title: 'UCLA',
          description: 'UCLA advances knowledge, addresses pressing societal needs and creates a university enriched by diverse perspectives where all individuals can flourish.',
          url: 'www.ucla.edu/',
          wikiweb_url: 'http://wikiweb.com/?www.ucla.edu/',
          tags: ['University', 'California', 'Los Angeles'],
          img: '',
          connected_by: [
            {
              username: '@HillaryClinton',
              url: 'https://twitter.com/HillaryClinton',
              img: 'https://pbs.twimg.com/profile_images/795491233279799296/cr3_0iQR_400x400.jpg'
            }
          ],
        },
      ]
    }

    // console.log(dataBlob)
    // // const relatedSites = dataBlob.relatedSites.map(function(item, index){
    // //   console.log(item, index)
    // // });
    // debugger

    return (
      <div>
        <div style={{display:'block', marginTop: '10px'}}>

          <div style={{float: 'left', marginLeft: '10px', marginRight: '10px', height: '100px'}}>
            <div style={{height: '48px', width: '48px', backgroundColor: 'brown', borderRadius: '4px'}}>
            </div>
          </div>

          <div style={{float: 'left'}}>
            <p style={{margin: 0, padding: 0}}>Title</p>
            <p style={{margin: 0, padding: 0}}>Description</p>
            <p style={{margin: 0, padding: 0}}>{tabURL}</p>
          </div>

        </div>
      </div>
    );
  }
}
