import React, { useState } from "react";
import PropTypes from "prop-types";
import List from "./List";

export default function ListItem({ item, handleRemove, handleMoveUp, handleMoveDown }) {
  return (
    <>
      <span>{item.text}</span>
      <button onClick={() => handleMoveUp(item.id)}>&uarr;</button>
      <button onClick={() => handleMoveDown(item.id)}>&darr;</button>
      <button onClick={() => handleRemove(item.id)}>Remove</button>
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
