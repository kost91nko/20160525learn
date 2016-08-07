import React, {Component} from 'react';
import styles from './CommentBox.scss';
import CommentList from './CommentList';
import comments from '../../data/comments.js';
import $ from 'jquery';

class CommentBox extends Component{
  constructor(props){
    super(props);

    this.getData();
  }

  getData(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({data: data});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  static defaultProps = {
    data: []
  }

  state = {
    data: this.props.data
  }

  render(){
    return (
      <div className={styles.root, styles.border}>
        <h1>Comments </h1>
        <CommentList data={this.state.data} />
      </div>
    );
  }
}
export default CommentBox;
