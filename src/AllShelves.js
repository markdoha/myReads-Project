import React from 'react';
import Shelf from './Shelfs';


const Shelves = ({books, updateBookShelf}) => {
    const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
    const read = books.filter((book) => book.shelf === "read");
    const whatToRead = books.filter((book) => book.shelf === "wantToRead");

    return (
        <div>
            <Shelf title="Currently Reading" books={currentlyReading} updateBookShelf={updateBookShelf}/>
            <Shelf title="Want To Read" books={whatToRead} updateBookShelf={updateBookShelf}/>
            <Shelf title="Read" books={read} updateBookShelf={updateBookShelf}/>
        </div>
    )
}

export default Shelves;