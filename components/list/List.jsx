import axios from 'axios';
import Promise from 'bluebird';
import React from 'react';
import ListView from './ListView.jsx';
import LogoNav from '../LogoNav.jsx';
import StickyFooter from '../StickyFooter.jsx';

class List extends React.Component {
  componentWillMount () {
    document.title = 'My List';
    axios.get('/api/v1/list').then((response) => {
      let { currentlyReading, wantToRead, completed } = (response.data);
      let titles = {};
      let getTitles = [];

      getTitles.push(axios.get('/api/v1/titles', {
        params: {
          ids: currentlyReading
        }
      }).then((response) => {
        titles.currentlyReading = response.data;
      }));

      getTitles.push(axios.get('/api/v1/titles', {
        params: {
          ids: wantToRead
        }
      }).then((response) => {
        titles.wantToRead = response.data;
      }));

      getTitles.push(axios.get('/api/v1/titles', {
        params: {
          ids: completed
        }
      }).then((response) => {
        titles.completed = response.data;
      }));

      Promise.all(getTitles).then(() => {
        this.props.done();
        this.setState({
          currentlyReading: {
            bookIds: currentlyReading,
            titles: titles.currentlyReading
          },
          wantToRead: {
            bookIds: wantToRead,
            titles: titles.wantToRead
          },
          completed: {
            bookIds: completed,
            titles: titles.completed
          }
        });
      });
    });
  }
  render () {
    if (!this.state) {
      return <div>
        <div className="container">
          <LogoNav />
        </div>
        <StickyFooter />
      </div>
    }
    let { currentlyReading, wantToRead, completed } = this.state;
    return <div>
      <div className="container">
        <LogoNav />
        <div className='animated fadeIn'>
          <ListView listName='Currently Reading' titles={currentlyReading.titles} bookIds={currentlyReading.bookIds} />
          <ListView listName='Want To Read' titles={wantToRead.titles} bookIds={wantToRead.bookIds} />
          <ListView listName='Completed' titles={completed.titles} bookIds={completed.bookIds} />
        </div>
      </div>
      <StickyFooter />
    </div>
  }
}

export default List;
