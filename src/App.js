import React from 'react';
import './App.css';
import List from './List'

// const TestItems = [
//   { id: 1, text: 'Coffee', position: 1 },
//   { id: 2, text: 'Tea', position: 2, items: [
//     { id: 3, text: 'Black tea', position: 1 },
//     { id: 4, text: 'Green tea', position: 2 },
//   ]},
//   { id: 5, text: 'Milk', position: 3 }
// ]

function App() {
  return (
    <div className="App">
      <h2>A Nested List Editor</h2>
      <div>
        <List/>
      </div>
    </div>
  );
}

export default App;