import Promise from 'bluebird';
import axios from 'axios';
import React from 'react';
import BookList from './BookList.jsx';
import LogoNav from '../LogoNav.jsx';
import StickyFooter from '../StickyFooter.jsx';

class Search extends React.Component {
  setSearchState (query) {
    const pathname = query ? '/search/' + query : '/search';

    if (window.location.pathname !== pathname) {
      window.history.pushState({}, '', pathname);
    }
    
    const { store } = this.props;
    store.dispatch({type: 'URL', pathname: pathname});
  }
  handleKeyUp (e) {
    if (13 === (e.which || e.keyCode || 0)) {
      this.handleSearch();
    }
  }
  handleSearch () {
    const query = document.querySelector('#searchField').value;
    this.setState({
      books: null
    });
    this.setSearchState(query);
    this.performSearch(query);
  }
  componentWillMount() {
    const query = decodeURI(window.location.pathname.split('/')[2] || '');
    if (query) {
      this.setState({value: query});
      this.performSearch(query);
  } else {
      this.setState({});
      this.props.done();
  }
  }
  performSearch (query) {
    let params = { title: query };
    axios.get('/api/v1/search', { params })
      .then((res) => {
        this.setState({
          books: res.data
        });
        this.props.done();
      });
  }
  render () {
    return <div>
      <div className='container'>
        <LogoNav />
        <br />
        <div className='row'>
          <div className="col-sm-12">
            <div className="input-group">
              <input id="searchField" type="text" className="form-control" defaultValue={this.state.value} placeholder="Enter a book title" onKeyUp={this.handleKeyUp.bind(this)}/>
              <div className="input-group-btn">
                <button type="button" className="btn btn-default" onClick={this.handleSearch.bind(this)}>Search</button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <BookList books={this.state.books} />
      </div>
      <StickyFooter />
    </div>
  }
}

export default Search;
