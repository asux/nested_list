import React, { useState } from "react";
import PropTypes from "prop-types";
import List from "./List";

export default function ListItem({item, lastPosition, handleMoveUp, handleMoveDown, handleRemove}) {
  const [currentItem, setCurrentItem] = useState(item);
  const first = item.position === 1;
  const last = item.position === lastPosition;
  let sublistButton;

  const [hasSublist, setHasSublist] = useState(
    currentItem.items && currentItem.items.length > 0
  );

  function handleAddItems(e) {
    e.preventDefault();
    setHasSublist(true);
  }

  function handleRemoveItems(e) {
    e.preventDefault();
    setHasSublist(false);
  }

  function pushToParent(newItem) {
    console.log("pushToParent", newItem);
    const itemClone = { ...currentItem };
    const items = itemClone.items || [];
    items.push(newItem);
    itemClone.items = items;
    console.debug(itemClone);
    setCurrentItem(itemClone);
  }

  if (hasSublist) {
    sublistButton = <button onClick={handleRemoveItems}>Remove Sublist</button>;
  } else {
    sublistButton = <button onClick={handleAddItems}>Add Sublist</button>;
  }

  return (
    <>
      <span>{currentItem.text}</span>
      {first || <button onClick={handleMoveUp}>&uarr;</button>}
      {last || <button onClick={handleMoveDown}>&darr;</button>}
      {sublistButton}
      <button onClick={handleRemove}>Remove</button>
      {hasSublist && <List items={item.items} pushToParent={pushToParent} />}
    </>
  );
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  lastPosition: PropTypes.number,
  handleMoveUp: PropTypes.func,
  handleDownUp: PropTypes.func,
  handleRemove: PropTypes.func,
};
