import FillBlank from '../common/FillBlank';

function PhraseItem({ phrase, index }) {
  // Parse alternative answers if present
  const altAnswers = phrase.altEnglish 
    ? phrase.altEnglish.split(' / ').filter(a => a !== phrase.english)
    : [];

  return (
    <div className="phrase-item">
      <span className="phrase-num">{index + 1}</span>
      <span className="phrase-cn">{phrase.chinese}</span>
      <FillBlank
        id={`phrase-${phrase.id}`}
        answer={phrase.english}
        altAnswers={altAnswers}
      />
    </div>
  );
}

export default PhraseItem;
