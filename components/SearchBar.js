import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Search = ({ placeholder, getQuery }) => {
  const [text, setText] = useState('');

  const inputChange = (q) => {
    setText(q);
    // getQuery(q);
  };

  const submitSearch = (text) => {
    getQuery(text);
  };

  return (
    <section className={styles.search}>
      <div>
        <input
          type='text'
          placeholder={placeholder}
          value={text}
          onChange={(e) => inputChange(e.target.value)}
        />
      </div>
      <button
        className={styles.searchbutton}
        onClick={() => submitSearch(text)}
      >
        Search
      </button>
    </section>
  );
};

export default Search;
