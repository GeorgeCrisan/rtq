import React, { useState } from 'react';
import { fetchQuizQuestions } from './api';
import { randomizeArray } from './utils';
// Components
import QuestionCard from './Components/QuestionCard';
// types
import { QuestionsState } from './api';
// Styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};


const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [catS, setCatS] = useState('');
  const [tq, setTq] = useState(15);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    let categories = ['17','18','20', '22','27'];
    let difs = ['easy', 'medium', 'hard'];

    let mapCat:any = {
      '17': 'Science and Nature',
      '18': 'Science: Computes',
      '20': 'Mythologhy',
      '22': 'Geography',
      '27': 'Animals',
      '28': 'Vehicles'
    }

    difs = randomizeArray(difs);
    categories = randomizeArray(categories);

    let slectedDif:any = difs[0];
    let slectedCat:any = categories[0];
    let localTq: number = tq;

    if(slectedCat === '20' || slectedCat === '27') {
      setTq(10);
      localTq = 10;
    }

    setCatS(`Category: ${mapCat[slectedCat].toUpperCase()} with Difficulty: ${slectedDif.toUpperCase()}`);

    const newQuestions = await fetchQuizQuestions(
      localTq,
      Number(slectedCat),
      slectedDif
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === tq) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };


  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1 style={{marginTop: "100px"}} >Kyrill's Clever Quizz </h1>
        {catS.length > 0  && <div style={{padding: '0 16px 0 16px', background: 'rgba(1,1,1,0.2)'}} >
          <p style={{fontSize: 24, color: "#87f1ff" }} > {catS} </p>
        </div>}
        {gameOver || userAnswers.length === tq ? (
          <button className='start' onClick={startTrivia}>
            Are you ready to start? Then click here!
          </button>
        ) : null}
        {!gameOver ? <p className='score'>{!gameOver && userAnswers.length !== tq ?"Score" : "Final Score"}: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={tq}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== tq- 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
