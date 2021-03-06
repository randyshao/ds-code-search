import styles from '../styles/Home.module.css';
import HighLighter from './Highlighter';
// import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

let logo;

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
        if (project.source == "Kaggle") {
          logo = <img width='20' src='kaggle.png' />;
        }
        else if (project.source == "Towards Data Science") {
          logo = <img width='20' src='tds.png' />;
        }
        else if (project.source == "GitHub") {
          logo = <img width='20' src='github.png' />;
        }
        let content = project.content.replaceAll('\\n', '\n');
        console.log(project);
        return (
          <div key={index} className={styles.result}>
            <p style={{ fontWeight: 'bold' }}>
              {' '}
              {logo}{'  '}
              <a className={styles.link} href={project.url}>
                {' '}
                {project.name}
              </a>
            </p>
            <p style={{ marginBottom: 0, fontSize: '0.83em' }}>
              {project.source} | {project.language} | {project.date} | {project.views} views
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
            <ReactMarkdown>{content}</ReactMarkdown>

            {/* <HighLighter
              text={project.content}
              highlight={search}
              highlightedItemClass='highlight'
            ></HighLighter> */}
          </div>
        );
      })}
    </div>
  );
};

export default Results;
