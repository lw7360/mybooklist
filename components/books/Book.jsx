import React from 'react';
import BookCard from './BookCard.jsx';
import LogoNav from '../LogoNav.jsx';
import StickyFooter from '../StickyFooter.jsx';

class Book extends React.Component {
  render () {
    const { store, id, done, loggedin } = this.props;
    return <div>
      <div className='container'>
        <LogoNav />
        <BookCard store={store} id={id} done={done} loggedin={loggedin} />
      </div>
      <StickyFooter />
    </div>
  }
}

export default Book;
