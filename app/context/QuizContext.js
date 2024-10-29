"use client";

import { createContext, useContext, useState } from "react";
import { QuizData } from "../data/QuizData";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizQuestions] = useState(QuizData);
  const [score, setScore] = useState(0);

  return (
    <QuizContext.Provider value={{ quizQuestions, score, setScore }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
