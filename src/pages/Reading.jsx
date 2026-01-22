import { useState, useEffect } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';
import FillBlank from '../components/common/FillBlank';

function Reading() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReadings = async () => {
      try {
        setLoading(true);
        const data = await api.get(API_ENDPOINTS.readings('8B-U1'));
        setReadings(data.readings);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch readings:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReadings();
  }, []);

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <div className="loading">加载中...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="container">
          <div className="error">加载失败: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="reading" className="section">
      <div className="container">
        <h2 className="section-title">三、课文知识点</h2>
        <h3 className="subsection-title">The Rise of Shenzhen 深圳的崛起</h3>

        <div className="reading-content">
          {readings.map((reading) => (
            <ReadingCard key={reading.id} reading={reading} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReadingCard({ reading }) {
  const content = JSON.parse(reading.content);

  return (
    <div className="reading-card">
      <h4>{reading.title}</h4>
      
      {content.explanation && (
        <p><strong>{content.explanation}</strong></p>
      )}

      {content.blanks && content.blanks.map((blank, idx) => (
        <p key={idx}>
          {renderBlankSentence(blank, reading.id, idx)}
        </p>
      ))}

      {content.note && (
        <p className="note">{content.note}</p>
      )}
    </div>
  );
}

function renderBlankSentence(blank, readingId, blankIdx) {
  const parts = blank.sentence.split('___');
  const answers = blank.answers || [blank.answer];
  let answerIndex = 0;

  return parts.map((part, idx) => (
    <span key={idx}>
      {part}
      {idx < parts.length - 1 && (
        <FillBlank
          id={`reading-${readingId}-${blankIdx}-${idx}`}
          answer={answers[answerIndex++] || answers[0]}
          altAnswers={blank.altAnswer ? [blank.altAnswer] : []}
        />
      )}
    </span>
  ));
}

export default Reading;
