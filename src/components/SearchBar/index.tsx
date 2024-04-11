import styles from './SearchBar.module.css';

export default function Search() {
  return (
    <div className={ styles.search }>
      <div className={ styles.bodySearch }>
        <input
          type="text"
          placeholder="Search"
          data-testid="search-input"
          className={ styles.imputSearch }
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
            />
            <label htmlFor="name" data-testid="name-search-radio">Name</label>
          </div>
          <div className={ styles.option }>
            <input
              type="radio"
              id="firstLetter"
              name="filterSearch"
              value="firstLetter"
              data-testid="first-letter-search-radio"
              className={ styles.radioForm }
            />
            <label htmlFor="firstLetter">First letter</label>
          </div>
        </div>
        <button
          data-testid="exec-search-btn"
          className={ styles.buttonSearch }
        >
          Search
        </button>
      </div>
    </div>
  );
}
