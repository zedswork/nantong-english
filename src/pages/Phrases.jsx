import { usePhrases } from '../hooks/useUnit';
import PhraseItem from '../components/phrases/PhraseItem';

function Phrases() {
  const { phrases, loading, error } = usePhrases('8B-U1');

  if (loading) {
    return (
      <section className="section section-alt">
        <div className="container">
          <div className="loading">加载中...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section section-alt">
        <div className="container">
          <div className="error">加载失败: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="phrases" className="section section-alt">
      <div className="container">
        <h2 className="section-title">二、核心词组</h2>
        <p className="section-desc">填写词组的英文翻译</p>

        <div className="phrases-container">
          {phrases.map((phrase, index) => (
            <PhraseItem 
              key={phrase.id} 
              phrase={phrase} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Phrases;
