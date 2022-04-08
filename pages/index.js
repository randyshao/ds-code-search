import Head from 'next/head';
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

  // arrays for filters
  const languages = ['Python', 'R'];
  const date = ['Over 1 year', 'Last year', 'Last week', 'Today'];
  const views = ['Under 100', '100 - 9999', 'More than 10,000'];

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

  // // get projects from database --- alternative version, no query
  useEffect(() => {
    const getProjects = async () => {
      const data = await getDocs(projectsCollectionRef);
      setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProjects();
  }, []);

  const [state, setState] = useState({
    results: projects,
    languages: new Set(),
  });

  // useEffect(() => {
  //   setState({
  //     languages: new Set(),
  //     results: projects,
  //   });
  // }, [projects]);

  console.log(state);

  const handleCheck = useCallback(
    (event) => {
      setState((previousState) => {
        let languages = new Set(previousState.languages);
        let results = projects;

        if (event.target.checked) {
          languages.add(event.target.value);
        } else {
          languages.delete(event.target.value);
        }

        if (languages.size) {
          results = results.filter((result) => {
            return languages.has(result.language);
          });
        }

        return {
          languages,
          results,
        };
      });
    },
    [setState]
  );

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
        <Filters
          handleCheck={handleCheck}
          languages={languages}
          date={date}
          views={views}
        />
        <Results filteredList={filteredList} tags={tags} search={search} />
      </div>
    </Layout>
  );
}
