import React from "react";
const Book = ({ book, changeBookShelf }) => {
  const coverImg =
    book.imageLinks && book.imageLinks.thumbnail
      ? book.imageLinks.thumbnail
      : "https://via.placeholder.com/128x193?text=No%20Cover";
  const bookTitle = book.title ? book.title : "No Title Available";
  const bookAuthors = book.authors ? book.authors : ["No Author"];
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${coverImg})`,
          }}
        />
        <div className="book-shelf-changer">
          <select
            defaultValue={book.shelf ? book.shelf : "none"}
            onChange={(e) => changeBookShelf(book, e.target.value)}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{bookTitle}</div>
      <div className="book-authors">{bookAuthors}</div>
    </div>
  );
};

export default Book;
