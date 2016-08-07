import React from 'react';
import {render} from 'react-dom';
import CommentBox from './react/Comments/CommentBox.js';
import FilterableProductTable from './react/FilterableProductTable/FilterableProductTable.js'
import TodoList from './react/TodoList/TodoList.js';

const product = {
  price: 100,
  name: "iphone",
  stocked: true
};

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

render(
  <TodoList />,
  document.getElementById('content')
);
