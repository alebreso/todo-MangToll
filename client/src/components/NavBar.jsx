import React, { Component } from 'react';
import '../styles/NavBar.css';

export default class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="tile-container">
          <div className="tile">MONDAY</div>
          <div className="tile">TUESDAY</div>  
          <div className="tile">WEDNESDAY</div>  
          <div className="tile">THURSDAY</div>  
          <div className="tile">FRIDAY</div>        
          <div className="tile">SATURDAY</div>        
        </div>
      </div>
    )
  }
}
