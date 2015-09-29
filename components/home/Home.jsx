import React from 'react';
import CascadingBooks from './CascadingBooks.jsx';
import LogoNav from '../LogoNav.jsx';
import StickyFooter from '../StickyFooter.jsx';

class Index extends React.Component {
  render () {
    const { store, done } = this.props;
    done();
    return <div>
      <div className='container'>
        <LogoNav store={store} />
        <br />
        <p>
          Keep track of the books you read.
        </p>
        <CascadingBooks />
      </div>
      <StickyFooter />
    </div>
  }
}

export default Index;
