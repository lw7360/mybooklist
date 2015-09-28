import React from 'react';
import CascadingBooks from './CascadingBooks.jsx';
import LogoNav from '../LogoNav.jsx';

class Index extends React.Component {
  render () {
    const { store } = this.props;
    return <div>
      <LogoNav store={store} />
      <br />
      <p>
        Keep track of the books you read.
      </p>
      <CascadingBooks />
    </div>
  }
}

export default Index;
