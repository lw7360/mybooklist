import React from 'react';
import BookCard from '../BookCard.jsx';
import LogoNav from '../LogoNav.jsx';
import StickyFooter from '../StickyFooter.jsx';

class Book extends React.Component {
  render () {
    return <div>
      <div className='container'>
        <LogoNav store={this.props.store} />
        <BookCard store={this.props.store} isbn={this.props.isbn} />
      </div>
      <StickyFooter />
    </div>
  }
}

export default Book;
