import React, { Component, PropTypes } from 'react'
import Connections from '../components/Connections'
import Add from '../components/Add'



class App extends Component {

  render() {
    return (
      <div style={{height:'200px', width:'200px'}}>
        <Connections />
      </div>
    )
  }
}

export default App
