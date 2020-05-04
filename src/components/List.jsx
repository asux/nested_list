import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: props.items };
  }

  defaultHandler = (e) => {
    console.debug(e);
  }

  render () {
    const { items } = this.state;
    return (
      <ul className="list">
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
    );
  };
};

List.propTypes = {
  items: PropTypes.array
}

export default List;
