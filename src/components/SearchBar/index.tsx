import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './SearchBar.module.css';
import useSearchMeal from '../../hooks/useSearchMeal';
import useSearchDrink from '../../hooks/useSearchDrink';

type SearchType = 'ingredient' | 'name' | 'first-letter';

let useSearch: any;

export default function SearchBar() {
  const location = useLocation().pathname;
  if (location.includes('meals')) {
    useSearch = useSearchMeal;
  } else {
    useSearch = useSearchDrink;
  }

  const { search } = useSearch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('name');

  const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(e.target.value as SearchType);
  };

  const handleClickSearchInput = () => {
    if (searchType === 'first-letter' && searchTerm.length !== 1) {
      alert('Your search must have only 1 (one) character');
    } else {
      search(searchTerm, searchType);
    }
  };

  return (
    <div className={ styles.search }>
      <div className={ styles.bodySearch }>
        <input
          type="text"
          placeholder="Search"
          data-testid="search-input"
          value={ searchTerm }
          onChange={ ({ target }) => setSearchTerm(target.value) }
          className={ styles.inputSearch }
        />
        <div className={ styles.filterSearch }>
          <div className={ styles.option }>
            <input
              type="radio"
              id="ingredient"
              name="filterSearch"
              value="ingredient"
              data-testid="ingredient-search-radio"
              className={ styles.radioForm }
              onChange={ onChangeRadio }
            />
            <label htmlFor="ingredient">Ingredient</label>
          </div>
          <div className={ styles.option }>
            <input
              type="radio"
              id="name"
              name="filterSearch"
              value="name"
              data-testid="name-search-radio"
              className={ styles.radioForm }
              onChange={ onChangeRadio }
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className={ styles.option }>
            <input
              type="radio"
              id="first-letter"
              name="filterSearch"
              value="first-letter"
              data-testid="first-letter-search-radio"
              className={ styles.radioForm }
              onChange={ onChangeRadio }
            />
            <label htmlFor="first-letter">First letter</label>
          </div>
        </div>
        <button
          data-testid="exec-search-btn"
          className={ styles.buttonSearch }
          type="button"
          onClick={ handleClickSearchInput }
        >
          Search
        </button>
      </div>
    </div>
  );
}
