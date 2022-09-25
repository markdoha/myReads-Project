import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Book from "./Books";
import Shelves from "./AllShelves";
import useQuery from "./Query";
import * as BooksAPI from "./BooksAPI";
import "./App.css";


const BooksApp = () => {
  const [books, setBooks] = useState([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());
  const [mergedBooks, setMergedBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [searchBooks, setSearchBooks] = useQuery(query);

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
      setMapOfIdToBooks(createMapOfBooks(data));
    });
  }, []);

  useEffect(
    () => {
      const combined = searchBooks.map((book) => {
        if (mapOfIdToBooks.has(book.id)) {
          return mapOfIdToBooks.get(book.id);
        } else {
          return book;
        }
      });
      setMergedBooks(combined);
    },
    [searchBooks]
  );

  const updateBookShelf = (book, To) => {
    const updatedBooks = books.map((b) => {
      if (b.id === book.id) {
        book.shelf = To;
        return book;
      }
      return b;
    });

    if (!mapOfIdToBooks.has(book.id)) {
      book.shelf = To;
      updatedBooks.push(book);
    }
    setBooks(updatedBooks);
    BooksAPI.update(book, To);
  };
  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map((book) => map.set(book.id, book));
    return map;
  };

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/search">
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/">
                  <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {mergedBooks.map((b) => (
                    <li key={b.id}>
                      <Book book={b} changeBookShelf={updateBookShelf} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Route>
          <Route path="/">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Shelves books={books} updateBookShelf={updateBookShelf} />
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default BooksApp;
