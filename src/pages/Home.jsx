import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <h1>Past and Present</h1>
          <p>8B Unit 1 - 现在完成时专题学习</p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">35+</span>
              <span className="stat-label">词汇</span>
            </div>
            <div className="stat">
              <span className="stat-number">30</span>
              <span className="stat-label">词组</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">练习</span>
            </div>
          </div>

          <Link to="/vocabulary" className="btn-start">
            开始学习
          </Link>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <h2 className="section-title">学习模块</h2>
          <p className="section-desc">选择一个模块开始学习</p>

          <div className="module-grid">
            <Link to="/vocabulary" className="module-card">
              <span className="module-icon">📖</span>
              <h3>单词拓展</h3>
              <p>学习38个核心词汇及其派生词</p>
            </Link>

            <Link to="/phrases" className="module-card">
              <span className="module-icon">💬</span>
              <h3>核心词组</h3>
              <p>掌握30个重点词组短语</p>
            </Link>

            <Link to="/reading" className="module-card">
              <span className="module-icon">📚</span>
              <h3>课文知识</h3>
              <p>深圳崛起 - 阅读理解知识点</p>
            </Link>

            <Link to="/grammar" className="module-card">
              <span className="module-icon">✏️</span>
              <h3>语法练习</h3>
              <p>现在完成时专项练习</p>
            </Link>

            <Link to="/ai-reading" className="module-card featured">
              <span className="module-icon">🤖</span>
              <h3>AI阅读</h3>
              <p>智能生成例句巩固词汇</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
