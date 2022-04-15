import styles from '../styles/Home.module.css';
import HighLighter from './highlighter';
// import remarkGfm from 'remark-gfm';

const Results = ({ filteredList, tags, search }) => {
  return (
    <div className={styles.resultsBox}>
      {filteredList.map((project, index) => {
        tags = [];
        if (project.tags) {
          project.tags.forEach((item) => {
            tags.push(item);
          });
        }
        return (
          <div key={index} className={styles.result}>
            <p style={{ fontWeight: 'bold' }}>
              {' '}
              <img width='20' src='kaggle.png' />{' '}
              <a className={styles.link} href={project.url}>
                {' '}
                {project.name}
              </a>
            </p>
            <p style={{ marginBottom: 0, fontSize: '0.83em' }}>
              {project.language} | {project.date} | {project.views} views
            </p>
            <div className={styles.tagsBox}>
              {tags.map((item) => (
                <div key={item} style={{ display: 'flex' }}>
                  <div className={styles.tag}>
                    <p>{item} |</p>
                  </div>
                </div>
              ))}
            </div>
            <br></br>
            {/* temporary snippet */}
            <HighLighter
              text={project.content}
              highlight={search}
              highlightedItemClass='highlight'
            ></HighLighter>
            {/* <img width='100%' src='coronavirus.png' /> */}
            {/* <p> CODE SNIPPET HERE -- -- --</p> */}
          </div>
        );
      })}
    </div>
  );
};

export default Results;
