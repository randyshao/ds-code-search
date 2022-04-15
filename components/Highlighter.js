const HighLighter = ({ text, highlight, highlightedItemClass }) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  const block = () => {
    let term = '';
    {
      parts.map((part, i) => {
        const highlightStyle =
          part.toLowerCase() === highlight.toLowerCase()
            ? highlightedItemClass
            : '';

        return (
          <span key={i} className={highlightStyle}>
            {part}
          </span>
        );
      });
    }
  };

  return (
    <div>
      {parts.map((part, i) => {
        const highlightStyle =
          part.toLowerCase() === highlight.toLowerCase()
            ? highlightedItemClass
            : '';
        if (part.className === highlightedItemClass) {
          term += part;
          console.log(term);
        }
        return (
          <span key={i} className={highlightStyle}>
            {part}
          </span>
        );
      })}
    </div>
  );
};

export default HighLighter;
