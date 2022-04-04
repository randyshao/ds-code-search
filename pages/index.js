import Head from 'next/head';
import SearchBar from '../components/SearchBar';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect} from 'react';
import Layout from '../components/Layout';
import { db } from './firebase';
import {collection, getDocs, } from 'firebase/firestore';
import { getDatabase, ref, query, limitToLast } from "firebase/database";

export default function Home() {

  const [name, setName] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [checked, setChecked] = useState([]);

  // arrays for filters
  const languages = ["Python", "R"];
  const date = ["Over 1 year", "Last 90 days", "Last week", "Today"];
  const views = ["Under 100","100 - 9999", "More than 10,000"];

  const [projects, setProjects] = useState([]);
  const projectsCollectionRef = collection(db, "projects");

  // const database = getDatabase();
  // const recentPostsRef = query(ref(database, 'projects'), limitToLast(3));

  // get projects from database
  useEffect(() => {
    const getProjects = async () => {
      const data = await getDocs(projectsCollectionRef);
      setProjects(data.docs.map((doc) => ({...doc.data(), id : doc.id})));
    }
    getProjects()
  }, []);


  // // searchbox filtering
  // useEffect(() => {
  //   const results = projects.filter(
  //     (project) =>
  //       project.project_name.toLowerCase().includes(name) +
  //       project.project_name.toUpperCase().includes(name) +
  //       project.language.toLowerCase().includes(name) +
  //       project.language.toUpperCase().includes(name)

  //     // project.library.includes(name)
  //   );
  //   setFilteredList(results);
  // }, [name]);

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
        return total + ", " + item;
      })
    : "";

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";


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
        getQuery={(q) => setName(q)}
      />
      <div className={styles.content}>
        <div className={styles.filterBox}>
          <h3 style={{color: 'black'}}>Filters</h3>
          <div style={{color:'black', fontSize: '12px'}}>
            {`Showing results for: ${checkedItems}`}
          </div>
          <br></br>
          <div className="filters">
            <h5>Date:</h5>
              {date.map((item, index) => (
                <div key={index}>
                  <input value={item} type="checkbox" onChange={handleCheck} />
                  <span className={ (item)}>{item}</span>
                </div>
              ))}
            <h5>Language:</h5>
              {languages.map((item, index) => (
                <div key={index}>
                  <input value={item} type="checkbox" onChange={handleCheck} />
                  <span className={isChecked(item)}>{item}</span>
                </div>
              ))}
              <h5>Number of Views:</h5>
              {views.map((item, index) => (
                <div key={index}>
                  <input value={item} type="checkbox" onChange={handleCheck} />
                  <span className={isChecked(item)}>{item}</span>
                </div>
              ))}
          </div>
        </div>
        {/* <div className={styles.resultsBox}>
          <table className={styles.DailyEvents}>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Language</th>
                <th>Libraries</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((project, index) => (
                <tr className={styles.row} key={index}>
                  <td>{project.project_name}</td>
                  <td>{project.language}</td>
                  <td>{project.library}</td>
                  <td>{project.tags}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        <div className={styles.resultsBox}>
          {projects.map((project) => {
              return (
                <div className ={styles.result}>
                  <p style={{fontWeight: "bold"}}> <img width='20' src='kaggle.png' /> <a className={styles.link} href={project.url}> {project.name}</a></p>
                  <p>{project.language} | {project.date} | {project.views} views</p>
                  <p>{project.tags}</p>
                  <p> CODE SNIPPET HERE
                        --
                        --
                        --
                  </p>                 
                </div>
              );
          })}
        </div>
      </div>
      {/* <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </Layout>
  );
}
