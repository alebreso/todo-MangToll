import * as React from 'react';
import { DropTarget } from 'react-dnd';

const columnTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem())
  }
}

class Column extends React.Component {
  render() {
    const {
      accepts,
      isOver,
      canDrop,
      connectDropTarget,
      lastDroppedItem,
    } = this.props;
    const isActive = isOver && canDrop;
    let backgroundColor = '#222';

    if(isActive){
      backgroundColor = 'darkgreen';
    }else if(canDrop){
      backgroundColor = 'darkkhaki'
    }

    return connectDropTarget(
      <div style={{backgroundColor}}>
        {
          isActive
          ? 'Realease to drop'
          : 'nonono'
        }
        {
          lastDroppedItem && (
            <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
          )
        }
      </div>
    )
  }
}

export default DropTarget(
  (props)=>props.accepts,
  columnTarget,
  (connect, monitor) => ({
    connectDropTarget:connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))(Column)