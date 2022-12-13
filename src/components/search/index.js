import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
//We’ve included a search bar for you in the Navigation component. Your task will be to add React Router to this search bar so that when a user searches for a particular pet, they are redirected to a page showing all pets whose names match the search query. First, you’ll need to make the search bar update the URL when the user enters a new search query. We will do this imperatively using the history object.

const Search = () => {
  const searchInputRef = useRef();
  const history = useHistory();

  const onSearchHandler = (e) => {
    e.preventDefault();

    const searchQuery = new URLSearchParams({
      name: searchInputRef.current.value
    }).toString(); // the value of 'searchQuery' will hold the query string, i.e. if the user searches for “fido”, the value of searchQuery will be 'name=fido'.

    history.push('/search?'+ searchQuery) //if searches for 'fido', this will redirect to '/search?name=fido'. Note: no need to have 'name=' in the () cause 'searchQuery' already returns that part in it.
  };

  return (
    <form onSubmit={onSearchHandler} className="search-form">
      <input type="text" className="search" ref={searchInputRef} />
      <button type="submit" className="search-button">
        🔎
      </button>
    </form>
  );
};

export default Search;
