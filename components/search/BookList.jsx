import React from 'react';

class BookList extends React.Component {
  render () {
    if (!this.props.books) {
      return <div></div>
    }
    console.log(this.props.books);
    let bookLinks = [];
    let books = this.props.books;
    for (let i = 0; i < books.length; i++) {
      try {
        let curBook = books[i].volumeInfo;
        let title = curBook.title;
        let author = curBook.authors.shift();
        // let pageCount = curBook.pageCount;
        let publishedDate = curBook.publishedDate;
        let isbn = curBook.industryIdentifiers.pop().identifier;
        bookLinks.push(<a href={'/books/' + isbn} key={i} className='list-group-item'><strong>{title}</strong>, by {author}. {publishedDate}</a>);
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
