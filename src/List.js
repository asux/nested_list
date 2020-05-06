import React, { useState } from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem";
import { generateId } from "./utils";

function compareByPosition(a, b) {
  if (a.position < b.position) {
    return -1;
  }
  if (a.position > b.position) {
    return 1;
  }
  return 0;
}

const List = (props) => {
  const [items, setItems] = useState(props.items || []);
  const [newItemText, setNewItemText] = useState('');

  const handleMoveUp = (itemId) => {
        console.error('moving up', itemId);
        const currentItemPositionIndex = items.findIndex((i) => i.id === itemId);
        const prevItemPositionIndex = currentItemPositionIndex - 1;
        console.error(currentItemPositionIndex, prevItemPositionIndex);
        const newItems = items.map((item, index) => {
            if (index === currentItemPositionIndex) {
              return items[prevItemPositionIndex]
            }
            if (index === prevItemPositionIndex) {
              return items[currentItemPositionIndex]
            }

            return item
        });
        console.error(newItems);
        setItems(newItems);
  };

  const handleMoveDown = (itemId) => {
    const currentItemPositionIndex = items.findIndex((i) => i.id === itemId);
    const nextItemPositionIndex = currentItemPositionIndex + 1;
    const newItems = items.map((item, index) => {
      if (index === nextItemPositionIndex) {
        return items[currentItemPositionIndex]
      }
      if (index === currentItemPositionIndex) {
        return items[nextItemPositionIndex]
      }

      return item
    });
    setItems(newItems);
  };

  const addItem = (e) => {
    e.preventDefault();
    let newItems = [...items, {
      id: generateId(),
      text: newItemText,
    }];
    setItems(newItems);
    setNewItemText('');
  };

  function handleRemove(itemId) {
      setItems(items.filter((item) => item.id !== itemId));
  }

  return (
    <ul>
      {items.map((item) => {
        console.error(item);
        return (
          <li>
            <ListItem
              key={item.id}
              item={item}
              lastPosition={items.length - 1}
              handleRemove={handleRemove}
              handleMoveUp={handleMoveUp}
              handleMoveDown={handleMoveDown}
            />
          </li>
        )
      })}
      <li>
        <form onSubmit={addItem}>
          <input
            type="text"
            className="add-item"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
           />
          <button type="submit">Add</button>
        </form>
      </li>
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.array,
  pushToParent: PropTypes.func,
};

export default List
