import React from 'react';

const Footer = ({
  allTodos
}) => (
  <footer>Todo Count: {allTodos && Object.keys(allTodos).length}</footer>
);

export default Footer;
