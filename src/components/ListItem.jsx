import React from 'react';
import PropTypes from 'prop-types';
import List from './List';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      items: props.items,
      hasMoveUpButton: props.hasMoveUpButton,
      hasMoveDownButton: props.hasMoveDownButton,
      handleMoveUp: props.handleMoveUp,
      handleMoveDown: props.handleMoveDown,
      handleRemove: props.handleRemove
    }
  }

  handleRemoveItems = () => {
    this.setState(prev => {
      let cloned = {...prev};
      cloned.items = [];
      return cloned;
    })
  }

  render () {
    const {text, items, hasUpButton, hasDownButton,
       handleMoveUp, handleMoveDown, handleRemove} = this.state
    let sublistButton;

    if (items && items.length > 0) {
      sublistButton = <button onClick={this.handleRemoveItems}>Remove Sublist</button>
    } else {
      sublistButton = <button onClick={this.handleAddItems}>Add Sublist</button>
    }

    return (
      <li className="list-item">
        <span>{text}</span>
        {hasUpButton && <button onClick={handleMoveUp}>&uarr;</button>}
        {hasDownButton && <button onClick={handleMoveDown}>&darr;</button>}
        {sublistButton}
        <button onClick={handleRemove}>Remove</button>
        {items && items.length > 0 &&
          <ul>
            {items.map((item, index, list) => <ListItem
              text={item.text}
              items={item.items}
              hasUpButton={index > 0}
              hasDownButton={index < list.length}
              handleMoveUp={this.defaultHandler}
              handleDownUp={this.defaultHandler}
              handleRemove={this.defaultHandler}
              key={item.id}
            />)}
            <li>
              <input type="text"></input>
              <button>Add</button>
            </li>
          </ul>
        }
      </li>
    )
  }
}

ListItem.propTypes = {
  text: PropTypes.string.isRequired,
  items: PropTypes.array,
  hasMoveUpButton: PropTypes.bool,
  hasMoveDownButton: PropTypes.bool,
  handleMoveUp: PropTypes.func,
  handleDownUp: PropTypes.func,
  handleRemove: PropTypes.func,
}

export default ListItem