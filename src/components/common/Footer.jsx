import { useProgressStore } from '../../stores/progressStore';

function Footer() {
  const { stats, getAccuracy, resetProgress } = useProgressStore();

  const handleCheckAll = () => {
    // Dispatch custom event that pages can listen to
    window.dispatchEvent(new CustomEvent('checkAllAnswers'));
  };

  const handleReset = () => {
    if (window.confirm('确定要重置所有进度吗？')) {
      resetProgress();
      window.dispatchEvent(new CustomEvent('resetAllAnswers'));
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="score-display">
          <h3>学习进度</h3>
          <div className="score-stats">
            <div className="score-item">
              <span className="score-label">已完成</span>
              <span className="score-value">{stats.completed}</span>
            </div>
            <div className="score-item">
              <span className="score-label">正确</span>
              <span className="score-value">{stats.correct}</span>
            </div>
            <div className="score-item">
              <span className="score-label">正确率</span>
              <span className="score-value">{getAccuracy()}%</span>
            </div>
          </div>
        </div>

        <div className="footer-actions">
          <button className="btn-check" onClick={handleCheckAll}>
            检查所有答案
          </button>
          <button className="btn-reset" onClick={handleReset}>
            重置
          </button>
        </div>

        <p className="copyright">
          8B Unit 1 - Past and Present 学习资料
        </p>
      </div>
    </footer>
  );
}

export default Footer;
