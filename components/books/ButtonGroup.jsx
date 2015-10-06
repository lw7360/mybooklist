import _ from 'lodash';
import axios from 'axios';
import Promise from 'bluebird';
import React from 'react';
import NProgress from 'nprogress';

class BookCard extends React.Component {
  updateState (data) {
    axios.get('/api/v1/list').then((response) => {
      let { completed, currentlyReading, wantToRead } = response.data;
      let inList = false;
      if (_.includes(completed, this.props.id)) {
        inList = 'completed';
      } else if (_.includes(currentlyReading, this.props.id)) {
        inList = 'currentlyReading';
      } else if (_.includes(wantToRead, this.props.id)) {
        inList = 'wantToRead';
      }
      this.setState({ inList });
    }.bind(this));
  }
  componentWillMount () {
    this.updateState();
  }
  onClick (e) {
    e.preventDefault();
    let { inList } = this.state;
    let list = e.target.id;
    if (list === 'default') {
      list = 'currentlyReading';
    }
    if (!list || list === inList) {
      return;
    }
    NProgress.start();

    let rmv = Promise.resolve(true);
    if (inList) {
      let params = {
        list: inList,
        bookId: this.props.id
      };
      rmv = axios.delete('/api/v1/list', { params });
    }

    let add = Promise.resolve(true);
    if (list !== 'remove') {
      add = axios.post('/api/v1/list', {
        list,
        bookId: this.props.id
      });
    }

    axios.all([rmv, add]).then(() => {
      this.updateState();
      NProgress.done();
    }.bind(this));
  }
  render () {
    if (!this.state) {
      return null;
    }
    let { inList } = this.state;
    
    let btn = <button id='default' type='button' className='btn btn-default btn-flat bookAdd disabled'>Already In List</button>;

    let currentlyReadingBtn = <li><a id='currentlyReading' onClick={this.onClick.bind(this)} href='#'>Add to Currently Reading</a></li>;
    let wantToReadBtn = <li><a id='wantToRead' onClick={this.onClick.bind(this)} href='#'>Add to Want to Read</a></li>;
    let completedBtn = <li><a id='completed' onClick={this.onClick.bind(this)} href='#'>Add to Completed</a></li>;
    let divider = <li role='separator' className='divider'></li>;
    let removeBtn = <li><a id='remove' onClick={this.onClick.bind(this)} href='#'>Remove from List</a></li>;

    switch (inList) {
      case 'currentlyReading':
        currentlyReadingBtn = <li className='disabled'><a id='currentlyReading' onClick={this.onClick.bind(this)} href='#'>
        <i className="fa fa-check-square"></i> Currently Reading</a></li>;
        break;
      case 'wantToRead':
        wantToReadBtn = <li className='disabled'><a id='wantToRead' onClick={this.onClick.bind(this)} href='#'>
        <i className="fa fa-check-square"></i> Want to Read</a></li>;
        break;
      case 'completed':
        completedBtn = <li className='disabled'><a id='completed' onClick={this.onClick.bind(this)} href='#'>
        <i className="fa fa-check-square"></i> Completed</a></li>;
        break;
      default:
        btn = <button id='default' type='button' className='btn btn-default btn-flat bookAdd' onClick={this.onClick.bind(this)}>Add to List</button>;    
        divider = null;
        removeBtn = null;
    }

    return <div className='btn-group'>
      {btn}
      <button type='button' className='btn btn-default dropdown-toggle btn-flat bookAdd' data-toggle='dropdown'>
        <span className='caret'></span>
        <span className='sr-only'>Dropdown</span>
      </button>
      <ul className='dropdown-menu'>
        {currentlyReadingBtn}
        {wantToReadBtn}
        {completedBtn}
        {divider}
        {removeBtn}
      </ul>
    </div>
  }
}

export default BookCard;
