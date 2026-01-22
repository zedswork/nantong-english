import { useVocabulary } from '../hooks/useUnit';
import VocabCard from '../components/vocabulary/VocabCard';

function Vocabulary() {
  const { vocabulary, loading, error } = useVocabulary('8B-U1');

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
    <section id="vocabulary" className="section">
      <div className="container">
        <h2 className="section-title">一、单词拓展</h2>
        <p className="section-desc">
          点击卡片展开详细内容，填写空白处检验学习效果
        </p>

        <div className="vocab-grid">
          {vocabulary.map((vocab, index) => (
            <VocabCard 
              key={vocab.id} 
              vocab={vocab} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Vocabulary;
