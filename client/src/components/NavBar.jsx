import React, { Component } from 'react'

export default class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="tile-container">
          <div className="tile">FLOWCHART</div>
          <div className="tile">WIREFRAME</div>  
          <div className="tile">PROTOTYPE</div>  
          <div className="tile">DEVELOPMENT</div>  
          <div className="tile">TEST</div>        
          <div className="tile">LAUNCH</div>        
        </div>
      </div>
    )
  }
}
