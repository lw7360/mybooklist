import { Circle } from '@lw7360/react-progressbar.js';
import React from 'react';
import xhr from 'xhr';

class BookCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true}
  }
  componentDidMount() {
    setTimeout(function() {
      xhr({
        url: '/sample.json',
        responseType: 'json',
      }, function(err, resp, body) {
        if (resp.statusCode === 200) {
          body.loading = false;
          this.setState(body);
        }
      }.bind(this));
    }.bind(this), 0)
  }
  render () {
    let options = {
      strokeWidth: 4
    };

    if (this.state.loading) {
      return <div className="bookCard"></div>
    } else {
      this.props.done();
      return <div className="bookCard animated fadeIn">
        <div className="row">
          <div className="col-sm-4"><img className="bookCardCover img-responsive img-thumbnail" src={this.state.cover}/>
            <br />
            <br />
            <Circle
              progress={this.state.rating / 5}
              text={this.state.rating}
              options={options}
              initialAnimate={true}
              containerClassName={'bookRating pull-left'} />

              <div className='btn-group'>
                <button type='button' className='btn btn-default btn-flat bookAdd'>Add to List</button>
                <button type='button' className='btn btn-default dropdown-toggle btn-flat bookAdd' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                  <span className='caret'></span>
                  <span className='sr-only'>Dropdown</span>
                </button>
                <ul className='dropdown-menu'>
                  <li><a href='#'>Add to Want to Read</a></li>
                  <li><a href='#'>Add to Completed</a></li>
                  <li role='separator' className='divider'></li>
                  <li><a href='#'>Remove from List</a></li>
                </ul>
              </div>
            <br />
            <br />
            <br />
          </div>
          <div className="col-sm-8">
            <span className="bookTitle">{this.state.title} 
              <span className="bookAuthor">, by {this.state.author}</span>
            </span>
            <hr />
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
