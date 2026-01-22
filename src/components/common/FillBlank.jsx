import { useState, useEffect, useRef } from 'react';
import { useProgressStore } from '../../stores/progressStore';

function FillBlank({ 
  id, 
  answer, 
  altAnswers = [], 
  placeholder = '',
  onAnswer,
  showAnswer = false,
}) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState(''); // '', 'correct', 'incorrect', 'missed'
  const inputRef = useRef(null);
  const { recordAnswer, getProgress } = useProgressStore();

  // All acceptable answers
  const allAnswers = [answer, ...altAnswers].map(a => a.toLowerCase().trim());

  useEffect(() => {
    // Load saved progress
    const progress = getProgress(id);
    if (progress) {
      setStatus(progress.isCorrect ? 'correct' : 'incorrect');
    }
  }, [id, getProgress]);

  useEffect(() => {
    // Listen for check all event
    const handleCheckAll = () => {
      if (!value.trim() && !status) {
        setValue(answer);
        setStatus('missed');
      } else if (value.trim() && !status) {
        checkAnswer();
      }
    };

    const handleReset = () => {
      setValue('');
      setStatus('');
    };

    window.addEventListener('checkAllAnswers', handleCheckAll);
    window.addEventListener('resetAllAnswers', handleReset);

    return () => {
      window.removeEventListener('checkAllAnswers', handleCheckAll);
      window.removeEventListener('resetAllAnswers', handleReset);
    };
  }, [value, status, answer]);

  const checkAnswer = () => {
    if (!value.trim()) return;

    const userAnswer = value.toLowerCase().trim().replace(/['']/g, "'");
    const isCorrect = allAnswers.some(
      a => userAnswer === a.replace(/['']/g, "'")
    );

    setStatus(isCorrect ? 'correct' : 'incorrect');
    recordAnswer(id, isCorrect);
    
    if (onAnswer) {
      onAnswer(isCorrect, value);
    }
  };

  const handleBlur = () => {
    if (value.trim()) {
      checkAnswer();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
      // Move to next input
      const allInputs = document.querySelectorAll('.fill-blank');
      const currentIndex = Array.from(allInputs).indexOf(inputRef.current);
      if (currentIndex < allInputs.length - 1) {
        allInputs[currentIndex + 1].focus();
      }
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // Reset status when input is cleared
    if (!newValue.trim() && status) {
      setStatus('');
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      className={`fill-blank ${status}`}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      title={status === 'incorrect' ? `正确答案: ${answer}` : ''}
    />
  );
}

export default FillBlank;
