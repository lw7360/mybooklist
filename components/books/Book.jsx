import React from 'react';
import BookCard from '../BookCard.jsx';
import LogoNav from '../LogoNav.jsx';
import StickyFooter from '../StickyFooter.jsx';

class Book extends React.Component {
  render () {
    const { store, isbn, done } = this.props;
    return <div>
      <div className='container'>
        <LogoNav store={store} />
        <BookCard store={store} isbn={isbn} done={done}/>
      </div>
      <StickyFooter />
    </div>
  }
}

export default Book;
