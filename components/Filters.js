import styles from '../styles/Home.module.css';
import { useState } from 'react';

const Filters = ({ handleCheck, date, views, languages }) => {
  const applyFilters = (e) => {
    // handle filter changes here????????????????????
    // maybe useEffect
    // idk how to reactjs
    // i want to set the query based on the filters and update the search results
    checked.forEach((item) => {
      if (item == 'Python') {
      }
      if (item == 'R') {
      }
    });
  };

  const [checked, setChecked] = useState([]);

  let isChecked = (item) =>
    checked.includes(item) ? 'checked-item' : 'not-checked-item';

  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ', ' + item;
      })
    : '';

  return (
    <div className={styles.filterBox}>
      <h3 style={{ color: 'black' }}>Filters</h3>
      <div style={{ color: 'black', fontSize: '12px' }}>
        {`Showing results for: ${checkedItems}`}
      </div>
      <div className='filters'>
        <h5>Date:</h5>
        {date.map((item, index) => (
          <div key={index} style={{ fontSize: '0.83em' }}>
            <input value={item} type='checkbox' onChange={handleCheck} />
            <span className={item}>{item}</span>
          </div>
        ))}
        <h5>Language:</h5>
        {languages.map((item, index) => (
          <div key={index} style={{ fontSize: '0.83em' }}>
            <input value={item} type='checkbox' onChange={handleCheck} />
            <span className={isChecked(item)}>{item}</span>
          </div>
        ))}
        <h5>Number of Views:</h5>
        {views.map((item, index) => (
          <div key={index} style={{ fontSize: '0.83em' }}>
            <input value={item} type='checkbox' onChange={handleCheck} />
            <span className={isChecked(item)}>{item}</span>
          </div>
        ))}
        <br></br>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
    </div>
  );
};

export default Filters;
