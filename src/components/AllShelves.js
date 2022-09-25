import React from "react";
import BooksComponent from "./BooksComponent";

const Shelf = ({ books, title, updateBookShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((b) => (
            <li key={b.id}>
              <BooksComponent book={b} changeBookShelf={updateBookShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

const Shelves = ({ books, updateBookShelf }) => {
  const currentlyReading = books.filter(
    (book) => book.shelf === "currentlyReading"
  );
  const read = books.filter((book) => book.shelf === "read");
  const whatToRead = books.filter((book) => book.shelf === "wantToRead");

  return (
    <div>
      <Shelf
        title="Currently Reading"
        books={currentlyReading}
        updateBookShelf={updateBookShelf}
      />
      <Shelf
        title="Want To Read"
        books={whatToRead}
        updateBookShelf={updateBookShelf}
      />
      <Shelf title="Read" books={read} updateBookShelf={updateBookShelf} />
    </div>
  );
};

export default Shelves;
