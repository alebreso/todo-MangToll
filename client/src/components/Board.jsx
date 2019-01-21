import React, { Component } from 'react';
import ColumnContainer from './ColumnContainer';

class Board extends Component {
  
  render() {
    const { columns, cards } = this.props;

    if(columns.loading === false && cards.loading === false){
      return (
        <div className="col-container">
          {
            columns.columns.map(col=> {
              return <ColumnContainer 
                name={col.name} 
                position={col.position} 
                key={`${col.name}-${col.position}`}
              />
            })
          }
        </div>
      ) 
    }
    return (
      <div></div>
    )
     
  }
}

// const mapStateToProps = (state) => ({
//   cards: state.cardReducer.cards,
//   columns: state.colReducer.columns,
// })

//export default connect(mapStateToProps,)(Board)
export default Board
