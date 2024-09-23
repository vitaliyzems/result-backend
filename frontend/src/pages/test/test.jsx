import styled from 'styled-components';
import { Button, Buttons } from '../../components';
import { AnswerOption, TestResult } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { ACTION_TYPE, fetchQuestionsAsync } from '../../actions';
import { selectCurrentIdx, selectQuestions } from '../../selectors';

const TestContainer = ({ className }) => {
  const questions = useSelector(selectQuestions);
  const currentIdx = useSelector(selectCurrentIdx);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const dispatch = useDispatch();

  const reloadTest = useCallback(() => {
    dispatch({ type: ACTION_TYPE.RELOAD_TEST });
    setIsFinished(false);
  }, [dispatch]);

  useEffect(() => {
    reloadTest();
  }, [reloadTest]);

  useEffect(() => {
    if (!isFinished) {
      dispatch(fetchQuestionsAsync());
    }
  }, [dispatch, isFinished]);

  useEffect(() => {
    setCurrentQuestion(questions[currentIdx]);
  }, [currentIdx, questions]);

  const nextButtonHandle = () => {
    dispatch({ type: ACTION_TYPE.INCREASE_CURRENT_IDX });
    dispatch({
      type: ACTION_TYPE.SET_USER_ANSWERS,
      payload: { key: currentIdx, value: selectedOption },
    });
    setSelectedOption(null);
  };

  const previousButtonHandle = () => {
    dispatch({ type: ACTION_TYPE.DECREASE_CURRENT_IDX });
  };

  const finishTest = () => {
    dispatch({
      type: ACTION_TYPE.SET_USER_ANSWERS,
      payload: { key: currentIdx, value: selectedOption },
    });
    setIsFinished(true);
    setSelectedOption(null);
  };

  return (
    <div className={className}>
      {isFinished ? (
        <TestResult isFinished={isFinished} reloadTest={reloadTest} />
      ) : (
        <>
          <div className="number">{`${currentIdx + 1}/${
            questions.length
          }`}</div>
          <div className="question-title">
            {questions[currentIdx]?.question}
          </div>
          <div className="answer-options">
            {currentQuestion?.options.map((value, idx) => (
              <AnswerOption
                key={idx}
                id={idx}
                value={value}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                currentIdx={currentIdx}
              />
            ))}
          </div>
          <Buttons>
            <Button
              disabled={currentIdx <= 0}
              bgColor="#ffff55"
              onClick={previousButtonHandle}
            >
              Предыдущий вопрос
            </Button>
            {currentIdx === questions.length - 1 ? (
              <Button
                disabled={!selectedOption}
                bgColor="green"
                onClick={finishTest}
              >
                Завершить тест
              </Button>
            ) : (
              <Button
                disabled={!selectedOption}
                bgColor="#ffff55"
                onClick={nextButtonHandle}
              >
                Следующий вопрос
              </Button>
            )}
          </Buttons>
        </>
      )}
    </div>
  );
};

export const Test = styled(TestContainer)`
  font-size: 22px;

  & .number {
    text-align: center;
  }

  & .question-title {
    text-align: center;
    margin-bottom: 20px;
  }

  & .answer-options {
    margin-bottom: 40px;
  }
`;
