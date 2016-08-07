import React, { Component } from 'react';
import s from './ProductCategoryRow.scss';

class ProductCategoryRow extends Component {
  render() {
    return (
      <tr>
        <td>
          <span className={s["stocked-text"], s.root}>{this.props.product.name}</span>
        </td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}

export default ProductCategoryRow
