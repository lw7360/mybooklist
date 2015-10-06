import React from 'react';

class ListView extends React.Component {
  render () {
    let {listName, titles, bookIds} = this.props;

    if (!bookIds.length) {
      return <div>
        <h2>{listName}</h2>
        ...
      </div>
    }
    let books = [];
    bookIds.forEach((id, index) => {
      books.push(<a key={id} href={'/books/' + id} className='list-group-item'>{titles[index]}</a>);
    });
    return <div>
      <h2>{listName}</h2>
      <div className='list-group'>
        {books}
      </div>
    </div>
  }
}

export default ListView;
