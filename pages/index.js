import Head from 'next/head';
import Axios from 'axios';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import Results from '../components/Results';
import styles from '../styles/Home.module.css';
import { useState, useEffect, useCallback } from 'react';
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
  const [skip, setSkip] = useState(0);

  const [projects, setProjects] = useState([]);
  const projectsCollectionRef = collection(db, 'projects');
  let tags = [];

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

  // get projects from database --- alternative version, no query
  useEffect(() => {
    // const variables = {
    //   skip: skip,
    // };

    getProjects();
  }, []);

  const getProjects = async () => {
    const data = await getDocs(projectsCollectionRef);
    setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // let skip = 0;
    // let findArgs = {};

    // for (let key in variables.filters) {
    //   if (variables.filters[key].length > 0) {
    //     findArgs[key] = variables.filters[key];
    //   }
    // }
  };

  // const getProjects = () => {
  //   Axios.post("/api/projects/getProjects").then(res => {
  //     if (res.data.success) {
  //         setProjects(res.data.projects)
  //     } else {
  //       alert('Failed to fectch product datas')
  //     }
  //   })
  // }

  const [search, setSearch] = useState('');

  // searchbox filtering
  useEffect(() => {
    const results = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(search) +
        project.name.toUpperCase().includes(search) +
        project.language.toLowerCase().includes(search) +
        project.language.toUpperCase().includes(search) +
        project.content.toUpperCase().includes(search) +
        project.content.toLowerCase().includes(search)

      // project.library.includes(name)
    );
    setFilteredList(results);
  }, [search]);

  // Add/Remove checked item from list
  // const handleCheck = (event) => {
  //   console.log(event.target.value);
  //   // var updatedList = [...checked];
  //   // if (event.target.checked) {
  //   //   updatedList = [...checked, event.target.value];
  //   // } else {
  //   //   updatedList.splice(checked.indexOf(event.target.value), 1);
  //   // }
  //   // setChecked(updatedList);
  // };

  // const [filters, setFilters] = useState({
  //   languages: [],
  //   date: [],
  //   views: [],
  // });

  // const showFilteredResults = () => {
  //   const variables = {
  //     skip: 0,
  //     filters: filters,
  //   };
  //   getProjects(variables);
  //   setSkip(0);
  // };

  // const handleFilters = (filters, category) => {
  //   console.log(filters);
  //   const newFilters = { ...filters };
  //   newFilters[category] = filters;

  //   showFilteredResults(newFilters);
  //   setFilters(newFilters);
  // };

  const [checked, setChecked] = useState([]);

  const handleCheck = (e) => {
    console.log(e.target.value);
    const isChecked = e.target.checked;
    const filter = e.target.value;
    const newChecked = [...checked];

    if (isChecked) {
      newChecked.push(filter);
      setChecked(newChecked);
      const results = filteredList.filter((project) =>
        project.language.includes(filter)
      );
      setFilteredList(results);
    } else {
      for (let i = 0; i < newChecked.length; i++) {
        if (newChecked[i] === filter) {
          newChecked.splice(i, 1);
          setChecked(newChecked);
        }
      }
    }
  };

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
        <Filters handleCheck={handleCheck} />
        <Results filteredList={filteredList} tags={tags} search={search} />
      </div>
    </Layout>
  );
}
