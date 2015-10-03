import React from 'react';
import CascadingBooks from './CascadingBooks.jsx';
import LogoNav from '../LogoNav.jsx';
import StickyFooter from '../StickyFooter.jsx';

class Index extends React.Component {
  render () {
    document.title = 'MyBookList';
    const { store, done, loggedin } = this.props;
    done();
    if (loggedin) {
      return <div>
        <div className='container'>
          <LogoNav />
          <br />
          <p>
            Keep track of the books you read.
            <br />
            <a href='/search'> Search</a> for some books to add to your list.
          </p>
          <CascadingBooks />
        </div>
        <StickyFooter />
      </div>
    }
    return <div>
      <div className='container'>
        <LogoNav />
        <br />
        <p>
          Keep track of the books you read.
          <br /> 
          <a href='/register'>Register</a> now, or
          <a href='/search'> search</a> for some books first.
        </p>
        <CascadingBooks />
      </div>
      <StickyFooter />
    </div>
  }
}

export default Index;
