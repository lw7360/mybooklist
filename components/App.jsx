import React from 'react';
import Index from './home/Index.jsx';
import BookCard from './BookCard.jsx';
import StickyFooter from './StickyFooter.jsx';

class App extends React.Component {
  componentWillMount () {
    const { store } = this.props;
    window.addEventListener('popstate', () => {
      store.dispatch({type: 'URL', pathname: window.location.pathname});
    });
    // running it once on load
    store.dispatch({type: 'URL', pathname: window.location.pathname});

    store.subscribe(() => {
      console.log(store.getState())
      this.forceUpdate();
    });
  }
  render () {
    const { store } = this.props;
    const curPath = store.getState().routing.get('URL');
    
    switch (curPath) {
    case '/':
      return <div>
        <div className='container'>
          <Index store={store} />
        </div>
        <StickyFooter />
      </div>;
    default:
      return <div>
        <div className='container'>
          <Index store={store} />
          <BookCard isbn="9780804139021" />
        </div>
        <StickyFooter />
      </div>;
    }
  }
}


export default App;
