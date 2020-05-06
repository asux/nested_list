import React, { useState } from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem";
import { generateId, compareByPosition } from "./utils";

export default function List({items, pushToParent}) {
  const [currentItems, setCurrentItems] = useState(items || []);
  const [newItemText, setNewItemText] = useState("");

  function handleMoveUp(itemId) {
    return (e) => {
      e.preventDefault();

      let newItems = [...currentItems];
      let current = newItems.find((i) => i.id === itemId);
      let prev = newItems.find((i) => i.position === current.position - 1);
      current.position -= 1;
      current.lastPosition = newItems.length + 1;
      if (prev) {
        prev.position += 1;
        prev.lastPosition = newItems.length + 1;
      }
      newItems = newItems.sort(compareByPosition);
      setCurrentItems(newItems);
    };
  }

  function handleMoveDown(itemId) {
    return (e) => {
      e.preventDefault();

      let newItems = [...currentItems];
      console.debug("copied currentItems:", newItems);
      let current = newItems.find((i) => i.id === itemId);
      let next = newItems.find((i) => i.position === current.position + 1);
      current.position += 1;
      current.lastPosition = newItems.length + 1;
      if (next) {
        next.position -= 1;
        next.lastPosition = newItems.length + 1;
      }
      newItems = newItems.sort(compareByPosition);
      setCurrentItems(newItems);
    };
  }

  function handleSubmit(e) {
    e.preventDefault();

    let newItems = [...currentItems];
    const newItem = {
      id: generateId(),
      position: newItems.length + 1,
      text: newItemText,
    };
    newItems.push(newItem);
    pushToParent && pushToParent(newItem);
    setCurrentItems(newItems);
    setNewItemText("");
  }

  function handleRemove(itemId) {
    return (e) => {
      setCurrentItems(currentItems.filter((item) => item.id !== itemId));
    };
  }

  return (
    <ul>
      {currentItems.map((item, index, list) => (
        <li>
          <ListItem
            key={item.id}
            item={item}
            lastPosition={list.length}
            handleRemove={handleRemove(item.id)}
            handleMoveUp={handleMoveUp(item.id)}
            handleMoveDown={handleMoveDown(item.id)}
          />
        </li>
      ))}
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
    </ul>
  );
}

List.propTypes = {
  currentItems: PropTypes.array,
  pushToParent: PropTypes.func,
};
