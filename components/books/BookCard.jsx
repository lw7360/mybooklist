import axios from 'axios';
import { Circle } from '@lw7360/react-progressbar.js';
import Promise from 'bluebird';
import React from 'react';
import ButtonGroup from './ButtonGroup.jsx';

class BookCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {loading: true}
  }
  componentWillMount () {
    const id = this.props.id;
    axios.get('/api/v1/book', { params: { id } })
      .then(function (response) {
        if (response.status === 200) {
          if (response.data) {
            let info = response.data[0].volumeInfo;
            let data = {};
            data.title = info.title;
            document.title = data.title || 'MyBookList';
            data.author = info.authors[0];
            data.authors = info.authors;
            data.rating = info.averageRating;
            data.pages = info.pageCount;
            data.published = info.publishedDate.substring(0, 4);
            data.cover = info.imageLinks.thumbnail || info.imageLinks.smallThumbnail;
            data.description = info.description;

            data.loading = false;
            this.setState(data);
            window.requestAnimationFrame(function() {
              $.bigfoot();
            });
            } else {
              this.setState({ loading: false, foundBook: false });
            }
        }
      }.bind(this));
  }
  render () {
    let options = {
      strokeWidth: 4
    };

    if (this.state.loading) {
      return <div className="bookCard"></div>
    } else if (this.state.foundBook === false) {
      return <div>Couldn't find book with id: {this.props.id}</div>
    } else {
      let authors = [];
      for (let i = 0; i < this.state.authors.length; i++) {
        authors.push(<p key={i}>{this.state.authors[i]}</p>);
      }
      this.props.done();
      return <div className="bookCard animated fadeIn">
        <div className="row">
          <div className="col-sm-4"><img className="bookCardCover img-responsive img-thumbnail" width="280" src={this.state.cover} />
            <br />
            <br />
            <Circle
              progress={this.state.rating / 5}
              text={this.state.rating}
              options={options}
              initialAnimate={true}
              containerClassName={'bookRating pull-left'} />
            {this.props.loggedin ? <ButtonGroup /> : <div><a href='/register'>Register</a>/<a href='/login'>login</a> to add to your list.</div>}
            <br />
            <br />
            <br />
          </div>
          <div className="col-sm-8">
            <span className="bookTitle">{this.state.title} 
              <span className="bookAuthor">, by {this.state.author}</span>

              {() => {
              if (authors.length === 1) {
                return;
              }
              return <div><span style={{marginLeft: '5px'}}>
                <sup id="fnref:1">
                  <a href="#fn:1" rel="footnote">1</a>
                </sup>
              </span>
              <div className="footnotes"><ol>
                <li className="footnote" id="fn:1">
                  <p>{authors}<a href="#fnref:1" title="return to article"> </a></p>
                </li>
              </ol></div></div>
              }()}

            </span>
            <hr />
            <div className='bookInfo'>
              {this.state.pages} pages. Published in {this.state.published}.
            </div>
            <br />
            <div className="bookDescription">
              <div dangerouslySetInnerHTML={{__html: this.state.description}} />
            </div>
          </div>
        </div>
      </div>
    }
  }
}

export default BookCard;
