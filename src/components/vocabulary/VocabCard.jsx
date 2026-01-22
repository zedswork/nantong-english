import { useState } from 'react';
import FillBlank from '../common/FillBlank';

function VocabCard({ vocab, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`vocab-card ${isOpen ? 'active' : ''}`}>
      <div 
        className="vocab-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="word-number">{index + 1}</span>
        <h3>{vocab.word}</h3>
        <span className="word-type">{vocab.wordType}</span>
      </div>

      {isOpen && (
        <div className="vocab-content">
          <p><strong>{vocab.meaningCn}</strong></p>
          
          {vocab.fillBlanks && vocab.fillBlanks.length > 0 && (
            <div className="fill-blanks-list">
              {vocab.fillBlanks.map((blank, idx) => (
                <p key={blank.id || idx}>
                  {renderSentenceWithBlanks(blank, vocab.id, idx)}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper function to render sentence with blanks
function renderSentenceWithBlanks(blank, vocabId, blankIdx) {
  const parts = blank.sentence.split('___');
  
  if (parts.length === 1) {
    return blank.sentence;
  }

  return parts.map((part, idx) => (
    <span key={idx}>
      {part}
      {idx < parts.length - 1 && (
        <FillBlank
          id={`vocab-${vocabId}-${blankIdx}-${idx}`}
          answer={blank.answer}
          altAnswers={blank.altAnswers ? JSON.parse(blank.altAnswers) : []}
        />
      )}
    </span>
  ));
}

export default VocabCard;
