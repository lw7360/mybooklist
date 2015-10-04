import Datastore from 'nedb';

let db = {}

// Stores usernames, hashed + salted pws, and emails.
db.users = new Datastore({
  filename: __dirname + '/../users.db',
  autoload: true
});

// Stores uuids and their associated booklists.
db.booklist = new Datastore({
  filename: __dirname + '/../booklist.db',
  autoload: true
})

db.users.persistence.setAutocompactionInterval(1000 * 60 * 5); // Compact the db every 5 minutes.
db.booklist.persistence.setAutocompactionInterval(1000 * 60 * 5); // Compact the db every 5 minutes.

export default db;
