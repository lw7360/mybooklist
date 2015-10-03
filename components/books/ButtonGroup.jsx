import React from 'react';
import NProgress from 'nprogress';

class BookCard extends React.Component {
  onClick (e) {
    e.preventDefault();
    NProgress.start();
    console.log(e.target.id);
  }
  render () {
    return <div className='btn-group'>
      <button id='default' type='button' className='btn btn-default btn-flat bookAdd' onClick={this.onClick}>Add to List</button>
      <button type='button' className='btn btn-default dropdown-toggle btn-flat bookAdd' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
        <span className='caret'></span>
        <span className='sr-only'>Dropdown</span>
      </button>
      <ul className='dropdown-menu'>
        <li><a id='currentlyReading' onClick={this.onClick} href='#'>Add to Currently Reading</a></li>
        <li><a id='wantToRead' onClick={this.onClick} href='#'>Add to Want to Read</a></li>
        <li><a id='completed' onClick={this.onClick} href='#'>Add to Completed</a></li>
        <li role='separator' className='divider'></li>
        <li><a id='remove' onClick={this.onClick} href='#'>Remove from List</a></li>
      </ul>
    </div>
  }
}

export default BookCard;
