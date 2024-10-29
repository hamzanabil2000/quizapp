"use client";

import { useState } from "react";
import { useQuiz } from "../context/QuizContext";

export default function Quiz() {
  const { quizQuestions, score, setScore } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const handleAnswer = () => {
    if (selectedOption === quizQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
      setCorrectCount(correctCount + 1);
    } else {
      setCorrectAnswer(quizQuestions[currentQuestionIndex].answer);
      setIncorrectCount(incorrectCount + 1);
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setIsAnswered(false);
      setSelectedOption("");
      setCorrectAnswer("");
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const question = quizQuestions[currentQuestionIndex];

  const handleRestartQuiz = () => {
    setShowScore(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setIsAnswered(false);
    setCorrectAnswer("");
    setCorrectCount(0);
    setIncorrectCount(0);
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      {showScore ? (
        <div className="text-center mt-6">
          <p className="text-lg font-bold">Quiz Completed!</p>
          <p className="mt-2 text-lg">
            Your Score: {score}/{quizQuestions.length}
          </p>
          <p className="mt-2 text-lg">Correct Answers: {correctCount}</p>
          <p className="mt-2 text-lg">Incorrect Answers: {incorrectCount}</p>
          <button
            onClick={handleRestartQuiz}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Start New Quiz
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center mb-6">Quiz App</h1>
          <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-lg font-semibold mb-4">{question.question}</h2>
            <ul>
              {question.options.map((option) => (
                <li key={option} className="mb-2">
                  <button
                    onClick={() => {
                      if (!isAnswered) setSelectedOption(option);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg border ${
                      isAnswered
                        ? option === question.answer
                          ? "bg-green-300"
                          : option === selectedOption
                          ? "bg-red-300"
                          : ""
                        : selectedOption === option
                        ? "bg-blue-100"
                        : ""
                    }`}
                    disabled={isAnswered}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
            {isAnswered && (
              <div className="mt-4">
                {selectedOption === question.answer ? (
                  <p className="font-semibold text-green-500">
                    Correct Answer!
                  </p>
                ) : (
                  <>
                    <p className="font-semibold text-red-500">
                      Incorrect Answer!
                    </p>
                    <p className="mt-2 text-green-900">
                      Correct Answer: {correctAnswer}
                    </p>
                  </>
                )}
              </div>
            )}
            {!isAnswered && (
              <button
                onClick={handleAnswer}
                disabled={!selectedOption}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
              >
                Submit Answer
              </button>
            )}
          </div>

          {isAnswered && (
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg"
            >
              {currentQuestionIndex < quizQuestions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
