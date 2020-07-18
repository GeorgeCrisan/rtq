import { randomizeArray } from './utils';

export type Question = {
  categoryNr: number;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionsState = Question & { answers: string[] };

export const fetchQuizQuestions = async (amount: number, cat: number, difficulty: string): Promise<QuestionsState[]> => {
  
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${cat}&difficulty=${difficulty}&type=multiple`;
  
  try{
    const data = await (await fetch(endpoint)).json();
    console.log('got the questions', data);
    return data.results.map((question: Question) => ({
      ...question,
      answers: randomizeArray([...question.incorrect_answers, question.correct_answer])
    }))

  } catch(e) {
    console.log(e, 'what error');
    return [];
  }
  
};