// ReactSurvey.tsx
import { useState } from 'react';
import type { FC } from 'react';

interface ProcessingTexts {
  waiting: string;
  sending_answers?: string;
  checking_ip?: string;
  checking_stock?: string;
  congrats?: string;
  accepted?: string;
  ip_verified?: string;
  stock_available?: string;
}

interface ReactSurveyProps {
  questions: string[];
  answers: string[];
  processing: ProcessingTexts;
}

const ReactSurvey: React.FC<ReactSurveyProps> = ({ questions, answers, processing }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleAnswerSelect = (answer: string) => {
    const newSelectedAnswers = [...selectedAnswers, answer];
    setSelectedAnswers(newSelectedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsProcessing(true);
      // Симуляция обработки ответа (например, вызов API)
      setTimeout(() => {
        setIsProcessing(false);
        console.log('Survey complete', newSelectedAnswers);
        // Здесь можно, например, перейти к следующему шагу анкеты
      }, 2000);
    }
  };

  if (isProcessing) {
    return (
      <div className="survey-processing">
        <p>{processing.waiting}</p>
      </div>
    );
  }

  return (
    <div className="react-survey">
      <h2>
        {questions[currentQuestionIndex]}{' '}
        <small>
          {currentQuestionIndex + 1} / {questions.length}
        </small>
      </h2>
      <div className="survey-answers">
        {answers.map((answer, idx) => (
          <button key={answer} type="button" onClick={() => handleAnswerSelect(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReactSurvey;
