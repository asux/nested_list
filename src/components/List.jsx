import React, { useState } from "react";
import PropTypes from "prop-types";
import { cloneDeep, sortBy } from "lodash";

function List(props) {
  const [items, setItems] = useState(props.items || []);
  const [newItemText, setNewItemText] = useState("");

  const root = props.position === 0;
  const first = props.position === 1;
  const last = props.position === props.lastPosition;

  let sublistButton;

  function generateId() {
    return new Date().getTime();
  }

  function handleMoveUp(itemId) {
    return (e) => {
      e.preventDefault();

      let newItems = cloneDeep(items);
      let current = newItems.find((i) => i.id === itemId);
      let prev = newItems.find((i) => i.position === current.position - 1);
      current.position -= 1;
      current.lastPosition = newItems.length + 1;
      if (prev) {
        prev.position += 1;
        prev.lastPosition = newItems.length + 1;
      }
      newItems = sortBy(newItems, "position");
      setItems(newItems);
    };
  }

  function handleMoveDown(itemId) {
    return (e) => {
      e.preventDefault();

      let newItems = cloneDeep(items);
      let current = newItems.find((i) => i.id === itemId);
      console.debug(newItems, current);
      let next = newItems.find((i) => i.position === current.position + 1);
      current.position += 1;
      current.lastPosition = newItems.length + 1;
      if (next) {
        next.position -= 1;
        next.lastPosition = newItems.length + 1;
      }
      newItems = sortBy(newItems, "position");
      setItems(newItems);
    };
  }

  function handleAddItems(e) {
    e.preventDefault();
    setItems([{ id: generateId(), position: 0 }]);
  }

  function handleRemoveItems(e) {
    e.preventDefault();
    setItems([]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let newItems = cloneDeep(items);
    newItems.push({
      id: generateId(),
      position: newItems.length + 1,
      text: newItemText,
    });
    setItems(newItems);
    setNewItemText("");
  }

  function handleRemove(itemId) {
    return (e) => {
      setItems(items.filter((item) => item.id !== itemId));
    };
  }

  if (items && items.length > 0) {
    sublistButton = <button onClick={handleRemoveItems}>Remove Sublist</button>;
  } else {
    sublistButton = <button onClick={handleAddItems}>Add Sublist</button>;
  }

  const controls = (
    <>
      <span>{props.text}</span>
      {first || <button onClick={props.handleMoveUp}>&uarr;</button>}
      {last || <button onClick={props.handleMoveDown}>&darr;</button>}
      {sublistButton}
      <button onClick={props.handleRemove}>Remove</button>
    </>
  );

  return (
    <>
      {root || controls}
      <ul>
        {items &&
          items.length > 0 &&
          items.map((item, index, list) => (
            <li>
              <List
                text={item.text}
                items={item.items}
                position={item.position}
                lastPosition={list.length}
                key={item.id}
                handleRemove={handleRemove(item.id)}
                handleMoveUp={handleMoveUp(item.id)}
                handleMoveDown={handleMoveDown(item.id)}
              />
            </li>
          ))}
        {root && (
          <li>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="add-item"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
              ></input>
              <button type="submit">Add</button>
            </form>
          </li>
        )}
      </ul>
    </>
  );
}

List.propTypes = {
  text: PropTypes.string,
  items: PropTypes.array,
  position: PropTypes.number.isRequired,
  lastPosition: PropTypes.number,
  id: PropTypes.string,
  handleMoveUp: PropTypes.func,
  handleDownUp: PropTypes.func,
  handleRemove: PropTypes.func,
};

export default List;
