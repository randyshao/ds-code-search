import styles from '../styles/Home.module.css';
import { useState } from 'react';

const Filters = ({ handleCheck }) => {
  // arrays for filters
  const languages = ['Python', 'R'];
  const date = ['Over 1 year', 'Last year', 'Last week', 'Today'];
  const views = ['Under 100', '100 - 9999', 'More than 10,000'];

  const [checked, setChecked] = useState([]);

  // Add/Remove checked item from list

  // const currentIndex = checked.indexOf(value);
  // const newChecked = [...checked];

  // if (currentIndex === -1) {
  //   newChecked.push(value);
  // } else {
  //   newChecked.splice(currentIndex, 1);
  // }
  // setChecked(newChecked);
  // props.handleFilters(newChecked);

  let isChecked = (item) =>
    checked.includes(item) ? 'checked-item' : 'not-checked-item';

  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ', ' + item;
      })
    : '';

  const renderLanguageFilters = () =>
    languages.map((item, index) => (
      <div key={index} style={{ fontSize: '0.83em' }}>
        <input
          value={item}
          name={item}
          type='checkbox'
          onChange={(e) => handleCheck(e)}
        />
        <label className={isChecked(item)} htmlFor={item}>
          {item}
        </label>
      </div>
    ));

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
            <input
              value={item}
              type='checkbox'
              onChange={() => handleCheck()}
            />
            <span className={item}>{item}</span>
          </div>
        ))}
        <h5>Language:</h5>
        {renderLanguageFilters()}
        <h5>Number of Views:</h5>
        {views.map((item, index) => (
          <div key={index} style={{ fontSize: '0.83em' }}>
            <input
              value={item}
              type='checkbox'
              onChange={() => handleCheck()}
            />
            <span className={isChecked(item)}>{item}</span>
          </div>
        ))}
        <br></br>
        <button>Apply Filters</button>
      </div>
    </div>
  );
};

export default Filters;
