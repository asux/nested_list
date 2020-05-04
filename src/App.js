import React from 'react';
import List from './components/List'
import './App.css';

const TestItems = [
  { id: 1, text: 'Coffee', position: 0 },
  { id: 2, text: 'Tea', position: 1, items: [
    { id: 3, text: 'Black tea', position: 0 },
    { id: 4, text: 'Green tea', position: 1 },
  ]},
  { id: 5, text: 'Milk', position: 2 }
]

function App() {
  return (
    <div className="App">
      <h2>A Nested List Editor</h2>
      <div>
        <List items={TestItems} />
      </div>
    </div>
  );
}

export default App;
