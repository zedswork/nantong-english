import { useExercises } from '../hooks/useUnit';
import ExerciseSection from '../components/grammar/ExerciseSection';

function Grammar() {
  const { exercises, loading, error } = useExercises('8B-U1');

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

  const sectionOrder = [
    '练习一：填入正确的动词形式',
    '练习二：辨析 since / for',
    '练习三：短暂动词 → 延续动词',
    '练习四：have been to / have gone to / have been in',
    '综合练习',
  ];

  return (
    <section id="grammar" className="section section-alt">
      <div className="container">
        <h2 className="section-title">四、语法练习</h2>
        <h3 className="subsection-title">现在完成时 Present Perfect Tense</h3>

        <div className="grammar-intro">
          <div className="grammar-box">
            <h4>用法说明</h4>
            <ul>
              <li><strong>已发生的动作对现在的影响</strong>: I'm sure we've met before.</li>
              <li><strong>始于过去并持续到现在</strong>: I haven't heard from her these days.</li>
              <li><strong>至今的经验或行动次数</strong>: I have seen the film many times.</li>
            </ul>
          </div>

          <div className="grammar-box">
            <h4>常见时间状语</h4>
            <div className="time-markers">
              <span className="marker">already</span>
              <span className="marker">yet</span>
              <span className="marker">just</span>
              <span className="marker">ever</span>
              <span className="marker">since + 过去点</span>
              <span className="marker">for + 时间段</span>
              <span className="marker">so far</span>
              <span className="marker">recently</span>
              <span className="marker">over the years</span>
            </div>
          </div>
        </div>

        {sectionOrder.map((sectionTitle) => {
          const sectionExercises = exercises[sectionTitle];
          if (!sectionExercises || sectionExercises.length === 0) return null;
          
          return (
            <ExerciseSection
              key={sectionTitle}
              title={sectionTitle}
              exercises={sectionExercises}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Grammar;
