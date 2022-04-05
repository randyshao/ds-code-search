import Head from 'next/head';
import SearchBar from '../components/SearchBar';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { db } from '../firebase/clientApp';
import { collection, getDocs, onSnapshot, where } from 'firebase/firestore';
import { getDatabase, ref, query, orderByChild } from 'firebase/database';

export default function Home() {
  /** TO DO:
   * search box filtering
   * check box filtering
   * display content in chunk instead of entire body content - access using project.content
   * deploy using Vercel at the end
   */

  const [filteredList, setFilteredList] = useState([]);
  const [checked, setChecked] = useState([]);

  // arrays for filters
  const languages = ['Python', 'R'];
  const date = ['Over 1 year', 'Last year', 'Last week', 'Today'];
  const views = ['Under 100', '100 - 9999', 'More than 10,000'];

  const [projects, setProjects] = useState([]);
  const projectsCollectionRef = collection(db, 'projects');
  var tags = [];

  // example query to only show all Python projects
  const q = query(projectsCollectionRef, where('language', '==', 'Python'));

  // get projects from database - query version
  // to view all projects: replace q with projectsCollectionRef
  // onSnapshot(q, (snapshot) => {
  //   const getProjects = async () => {
  //     const data = await getDocs(projectsCollectionRef);
  //     setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getProjects();
  // });

  function applyFilters(e) {
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
  }

  // // get projects from database --- alternative version, no query
  useEffect(() => {
    const getProjects = async () => {
      const data = await getDocs(projectsCollectionRef);
      setProjects(data.docs.map((doc) => ({...doc.data(), id : doc.id})));
    }
    getProjects()
  }, []);

  const [search, setSearch] = useState('');

  // searchbox filtering
  useEffect(() => {
    const results = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(search) +
        project.name.toUpperCase().includes(search) +
        project.language.toLowerCase().includes(search) +
        project.language.toUpperCase().includes(search)

      // project.library.includes(name)
    );
    setFilteredList(results);
  }, [search]);

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ', ' + item;
      })
    : '';

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? 'checked-item' : 'not-checked-item';

  return (
    <Layout>
      <Head>
        <title>DataSearch</title>
        <meta name='description' content='CISC 499' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div style={{ textAlign: 'center' }}>
        <img width='100' src='logo.png' />
        <h2 style={{ color: 'white' }}>DataSearch</h2>
      </div>

      <SearchBar
        placeholder='Search projects...'
        getQuery={(q) => setSearch(q)}
      />
      <div className={styles.content}>
        <div className={styles.filterBox}>
          <h3 style={{ color: 'black' }}>Filters</h3>
          <div style={{ color: 'black', fontSize: '12px' }}>
            {`Showing results for: ${checkedItems}`}
          </div>
          <div className='filters'>
            <h5>Date:</h5>
            {date.map((item, index) => (
              <div key={index}  style={{fontSize : '0.83em'}}>
                <input value={item} type='checkbox' onChange={handleCheck} />
                <span className={item}>{item}</span>
              </div>
            ))}
            <h5>Language:</h5>
            {languages.map((item, index) => (
              <div key={index}  style={{fontSize : '0.83em'}}>
                <input value={item} type='checkbox' onChange={handleCheck} />
                <span className={isChecked(item)}>{item}</span>
              </div>
            ))}
            <h5>Number of Views:</h5>
            {views.map((item, index) => (
              <div key={index} style={{fontSize : '0.83em'}}>
                <input value={item} type='checkbox' onChange={handleCheck} />
                <span className={isChecked(item)}>{item}</span>
              </div>
            ))}
            <br></br>
            <button onClick={applyFilters}>Apply Filters</button>
          </div>
        </div>
        <div className={styles.resultsBox}>
          {filteredList.map((project) => {
            tags = [];
            if (project.tags) {
              project.tags.forEach(item => {
                tags.push(item);
              })
            }
            return (
              <div className={styles.result}>
                <p style={{ fontWeight: 'bold' }}>
                  {' '}
                  <img width='20' src='kaggle.png' />{' '}
                  <a className={styles.link} href={project.url}>
                    {' '}
                    {project.name}
                  </a>
                </p>
                <p style={{marginBottom: 0, fontSize: '0.83em'}}>
                  {project.language} | {project.date} | {project.views} views
                </p>
                <div className={styles.tagsBox}>
                  {tags.map((item) => (
                      <div key={item} style={{ display: "flex" }}>
                      <div className={styles.tag}>
                        <p>{item} |</p>
                      </div>
                    </div>
                    ))}
                </div>
                <br></br>
                {/* temporary snippet */}
                <img width='100%' src='coronavirus.png' />
                {/* <p> CODE SNIPPET HERE -- -- --</p> */}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
