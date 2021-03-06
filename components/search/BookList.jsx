import React from 'react';

class BookList extends React.Component {
  render () {
    if (!this.props.books) {
      return <div></div>
    }
    let bookLinks = [];
    let books = this.props.books;
    for (let i = 0; i < books.length; i++) {
      try {
        let curBook = books[i];
        let id = curBook.id;
        let title = curBook.title;
        let author = curBook.authors[0];
        let publishedDate = curBook.publishedDate;
        bookLinks.push(<a href={'/books/' + id} key={id} className='list-group-item'><strong>{title}</strong>, by {author}. {publishedDate}</a>);
      } catch (e) {}
    }
    return <div>
      <div className="list-group">
        {bookLinks}
      </div>
    </div>
  }
}

export default BookList;
