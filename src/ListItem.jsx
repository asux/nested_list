import React, { useState } from "react";
import PropTypes from "prop-types";
import List from "./List";

export default function ListItem(props) {
  const [item, setItem] = useState(props.item);
  const first = item.position === 1;
  const last = item.position === props.lastPosition;
  let sublistButton;

  const [hasSublist, setHasSublist] = useState(
    item.items && item.items.length > 0
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
    const itemClone = { ...item };
    const items = itemClone.items || [];
    items.push(newItem);
    itemClone.items = items;
    console.debug(itemClone);
    setItem(itemClone);
  }

  if (hasSublist) {
    sublistButton = <button onClick={handleRemoveItems}>Remove Sublist</button>;
  } else {
    sublistButton = <button onClick={handleAddItems}>Add Sublist</button>;
  }

  return (
    <>
      <span>{item.text}</span>
      {first || <button onClick={props.handleMoveUp}>&uarr;</button>}
      {last || <button onClick={props.handleMoveDown}>&darr;</button>}
      {sublistButton}
      <button onClick={props.handleRemove}>Remove</button>
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
