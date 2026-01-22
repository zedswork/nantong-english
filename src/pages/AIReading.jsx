import { useState, useEffect } from 'react';
import { useVocabulary } from '../hooks/useUnit';
import { useSpeech } from '../hooks/useSpeech';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

function AIReading() {
  const { vocabulary, loading, error } = useVocabulary('8B-U1');
  const { speak, stop, isSpeaking } = useSpeech();
  
  const [selectedWords, setSelectedWords] = useState(new Set());
  const [learningStep, setLearningStep] = useState(1);
  const [showLearning, setShowLearning] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);
  const [sentences, setSentences] = useState([]);
  const [generatingStory, setGeneratingStory] = useState(false);
  const [quizStats, setQuizStats] = useState({ total: 0, correct: 0, incorrect: 0 });

  const toggleWord = (wordId) => {
    setSelectedWords((prev) => {
      const next = new Set(prev);
      if (next.has(wordId)) {
        next.delete(wordId);
      } else {
        next.add(wordId);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedWords(new Set(vocabulary.map((v) => v.id)));
  };

  const clearAll = () => {
    setSelectedWords(new Set());
  };

  const startLearning = () => {
    if (selectedWords.size === 0) {
      alert('请至少选择1个单词');
      return;
    }
    setShowLearning(true);
    setLearningStep(1);
    setQuizStats({ total: 0, correct: 0, incorrect: 0 });
  };

  const learningWords = vocabulary.filter((v) => selectedWords.has(v.id));

  const handleWordClick = (vocab) => {
    setCurrentWord(vocab);
    speak(vocab.word);
  };

  const playAllWords = () => {
    let index = 0;
    const playNext = () => {
      if (index < learningWords.length) {
        const word = learningWords[index];
        setCurrentWord(word);
        speak(word.word, { 
          onEnd: () => {
            index++;
            setTimeout(playNext, 500);
          }
        });
      }
    };
    playNext();
  };

  const markQuizAnswer = (isCorrect) => {
    setQuizStats((prev) => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
    }));
  };

  const generateSentences = async () => {
    if (learningWords.length === 0) return;
    
    setGeneratingStory(true);
    try {
      const words = learningWords.map((v) => ({
        id: v.id,
        word: v.word,
        meaning: v.meaningCn,
      }));
      
      const data = await api.post(API_ENDPOINTS.aiSentences, { words });
      setSentences(data.sentences);
    } catch (err) {
      console.error('Failed to generate sentences:', err);
      // Fallback to local generation
      const fallbackSentences = learningWords.map((v) => ({
        word: v.word,
        sentence: `We learned the word "${v.word}" today.`,
      }));
      setSentences(fallbackSentences);
    } finally {
      setGeneratingStory(false);
    }
  };

  const stepInfo = {
    1: '点击单词显示释义并发音，老师讲解含义。',
    2: '点击"一键朗读"按顺序朗读，帮助记忆发音。',
    3: '点击单词只听发音，不显示释义，让学生说出意思。',
    4: '点击单词发音，学生回答后点"正确/错误"。',
    5: '为每个单词生成常用例句，点击高亮单词可听发音。',
  };

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
    <section id="ai-reading" className="section">
      <div className="container">
        <h2 className="section-title">五、AI阅读 - 词汇巩固</h2>
        <p className="section-desc">
          按课本顺序选择不认识的单词，完成 5 步学习后生成例句。
        </p>

        <div className="ai-reading-container">
          {/* Word Selection */}
          <div className="word-selection-section">
            <div className="step-header">
              <span className="step-badge">步骤1</span>
              <h3>按顺序选择不认识的单词</h3>
              <p className="step-desc">先浏览单词顺序，再选择学生不认识的词。建议 10-30 个。</p>
            </div>

            <div className="selection-stats">
              <div className="stat-item">
                <span className="stat-label">已选择</span>
                <span className="stat-value">{selectedWords.size}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">建议</span>
                <span className="stat-value">10-20</span>
              </div>
            </div>

            <div className="quick-actions">
              <button className="btn-quick" onClick={selectAll}>全选</button>
              <button className="btn-quick btn-clear" onClick={clearAll}>清空</button>
            </div>

            <div className="ordered-word-list">
              {vocabulary.map((vocab, index) => (
                <button
                  key={vocab.id}
                  className={`ordered-word-item ${selectedWords.has(vocab.id) ? 'selected' : ''}`}
                  onClick={() => toggleWord(vocab.id)}
                >
                  <span className="order-number">{index + 1}</span>
                  <span className="order-word">{vocab.word}</span>
                </button>
              ))}
            </div>

            <div className="start-learning-section">
              <button 
                className="btn-start-learning"
                onClick={startLearning}
                disabled={selectedWords.size === 0}
              >
                {selectedWords.size === 0 
                  ? '请先选择单词' 
                  : `开始学习 ${selectedWords.size} 个单词 →`}
              </button>
              <p className="start-hint">
                点击上方单词选择要学习的词汇，然后点击此按钮开始5步学习
              </p>
            </div>
          </div>

          {/* Learning Steps */}
          {showLearning && (
            <div className="learning-steps">
              <div className="steps-nav">
                {[1, 2, 3, 4, 5].map((step) => (
                  <button
                    key={step}
                    className={`step-pill ${learningStep === step ? 'active' : ''}`}
                    onClick={() => setLearningStep(step)}
                  >
                    {step} {['释义', '听读', '听读无释义', '测验', '例句'][step - 1]}
                  </button>
                ))}
              </div>

              <div className="step-card">
                <div className="step-info">{stepInfo[learningStep]}</div>

                {learningStep === 2 && (
                  <div className="step-controls">
                    <button className="btn-control" onClick={playAllWords}>
                      一键朗读
                    </button>
                    <button className="btn-control btn-stop" onClick={stop}>
                      停止
                    </button>
                  </div>
                )}

                {learningStep < 5 ? (
                  <div className="practice-area">
                    <div className="study-word-grid">
                      {learningWords.map((vocab, index) => (
                        <button
                          key={vocab.id}
                          className={`study-word-item ${currentWord?.id === vocab.id ? 'active' : ''}`}
                          onClick={() => handleWordClick(vocab)}
                        >
                          <span className="study-order">{index + 1}</span>
                          <span className="study-word">{vocab.word}</span>
                        </button>
                      ))}
                    </div>

                    <div className="word-detail-panel">
                      <div className="detail-label">Dictionary</div>
                      <div className="detail-word">
                        {currentWord?.word || '请选择一个单词'}
                      </div>
                      <div className="detail-meaning">
                        {learningStep === 1 || learningStep === 4
                          ? (currentWord?.meaningCn || '释义将在这里显示')
                          : (learningStep === 2 ? '点击或朗读记忆发音' : '只听发音，不显示释义')}
                      </div>
                      <div className="detail-actions">
                        <button 
                          className="btn-speak"
                          onClick={() => currentWord && speak(currentWord.word)}
                        >
                          🔊 发音
                        </button>
                      </div>

                      {learningStep === 4 && (
                        <>
                          <div className="quiz-actions">
                            <button className="btn-correct" onClick={() => markQuizAnswer(true)}>
                              正确
                            </button>
                            <button className="btn-wrong" onClick={() => markQuizAnswer(false)}>
                              错误
                            </button>
                          </div>
                          <div className="quiz-summary">
                            已答：{quizStats.total} 正确：{quizStats.correct} 错误：{quizStats.incorrect}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="story-area">
                    <div className="generate-section">
                      <button 
                        className={`btn-generate ${learningWords.length > 0 ? 'ready' : ''}`}
                        onClick={generateSentences}
                        disabled={generatingStory || learningWords.length === 0}
                      >
                        <span className="btn-icon">AI</span>
                        <span className="btn-text">
                          {generatingStory ? '生成中...' : '生成例句'}
                        </span>
                      </button>
                      <p className="generate-hint">为每个单词生成常用例句</p>
                    </div>

                    {sentences.length > 0 && (
                      <div className="story-section">
                        <div className="story-card">
                          <h3 className="story-title">例句练习 Example Sentences</h3>
                          <div className="story-content">
                            <div className="example-sentences-list">
                              {sentences.map((item, index) => {
                                const vocab = learningWords.find(
                                  (v) => v.word.toLowerCase() === item.word.toLowerCase()
                                );
                                return (
                                  <div key={index} className="example-sentence-item">
                                    <span className="sentence-number">{index + 1}</span>
                                    <div className="sentence-content">
                                      <p className="sentence-text">
                                        {highlightWord(item.sentence, item.word, speak)}
                                      </p>
                                      <p className="sentence-word">
                                        <strong>{item.word}</strong> - {vocab?.meaningCn || ''}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="vocab-summary">
                          <h4>本文词汇统计 Vocabulary in This Story</h4>
                          <div className="vocab-tags">
                            {learningWords.map((vocab) => (
                              <span
                                key={vocab.id}
                                className="vocab-tag"
                                onClick={() => speak(vocab.word)}
                              >
                                {vocab.word}
                              </span>
                            ))}
                          </div>
                          <p className="vocab-count">
                            共包含 <span>{learningWords.length}</span> 个选定词汇
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function highlightWord(sentence, word, speak) {
  const regex = new RegExp(`\\b(${word})\\b`, 'gi');
  const parts = sentence.split(regex);

  return parts.map((part, index) => {
    if (part.toLowerCase() === word.toLowerCase()) {
      return (
        <span
          key={index}
          className="vocab-word"
          onClick={() => speak(word)}
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

export default AIReading;
