import FillBlank from '../common/FillBlank';

function ExerciseSection({ title, exercises }) {
  return (
    <div className="exercise-section">
      <h4>{title}</h4>
      <div className="exercise-grid">
        {exercises.map((exercise, index) => (
          <ExerciseItem 
            key={exercise.id} 
            exercise={exercise} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
}

function ExerciseItem({ exercise, index }) {
  // Parse the question to find blanks (marked with ___)
  const parts = exercise.question.split(/(_+)/);
  const answers = exercise.answer.split(' / ');
  let answerIndex = 0;

  return (
    <div className="exercise-item">
      <span className="ex-num">{index + 1}</span>
      <p>
        {parts.map((part, idx) => {
          if (part.match(/^_+$/)) {
            const currentAnswer = answers[answerIndex] || answers[0];
            answerIndex++;
            return (
              <FillBlank
                key={idx}
                id={`exercise-${exercise.id}-${idx}`}
                answer={currentAnswer}
                altAnswers={exercise.altAnswers ? JSON.parse(exercise.altAnswers) : []}
              />
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </p>
    </div>
  );
}

export default ExerciseSection;
