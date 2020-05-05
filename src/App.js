import React from 'react';
import List from './components/List'
import './App.css';

const TestItems = [
  { id: 1, text: 'Coffee', position: 1 },
  { id: 2, text: 'Tea', position: 2, items: [
    { id: 3, text: 'Black tea', position: 1 },
    { id: 4, text: 'Green tea', position: 2 },
  ]},
  { id: 5, text: 'Milk', position: 3 }
]

function App() {
  return (
    <div className="App">
      <h2>A Nested List Editor</h2>
      <div>
        <List items={TestItems} position={0} lastPosition={3}/>
      </div>
    </div>
  );
}

export default App;
