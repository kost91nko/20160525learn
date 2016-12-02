import TodoApp from './TodoApp';
import React from 'react';
import DevTools from '../DevTools/DevTools.js';

const App = ({ params }) => (
  <div>
    <TodoApp filter={ params.filter || 'all' } />
    <DevTools />
  </div>
)

export default App;
