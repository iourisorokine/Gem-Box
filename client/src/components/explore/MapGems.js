import React, { Component } from 'react'

class MapGems extends Component {

  render() {
    const gemsToRender=this.props.gems.map(gem=>{
      return(
        <div>
          <h3>{gem.title}</h3>
          <p>{gem.category}</p>
        </div>
      )
    });
    return (
      <div style={{border:"1px solid green"}}>
        {gemsToRender}
      </div>
    )
  }
}

export default MapGems;
