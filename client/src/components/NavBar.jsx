import React, { Component } from 'react'

export default class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <div class="tile-container">
          <div class="tile">FLOWCHART</div>
          <div class="tile">WIREFRAME</div>  
          <div class="tile">PROTOTYPE</div>  
          <div class="tile">DEVELOPMENT</div>  
          <div class="tile">TEST</div>        
          <div class="tile">LAUNCH</div>        
        </div>
      </div>
    )
  }
}
