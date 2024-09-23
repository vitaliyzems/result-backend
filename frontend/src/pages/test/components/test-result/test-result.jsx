import styled from 'styled-components';
import { Button, Buttons } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectAnswers,
  selectResults,
  selectUserAnswers,
} from '../../../../selectors';
import { useEffect, useState } from 'react';
import { ACTION_TYPE } from '../../../../actions';
import { postResults } from '../../../../api';
import { calcCorrectAnswers } from '../../../../utils';

const TestResultContainer = ({ className, isFinished, reloadTest }) => {
  const results = useSelector(selectResults);
  const answers = useSelector(selectAnswers);
  const userAnswers = useSelector(selectUserAnswers);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isFinished) {
      const finalResults = answers.map(
        (answer, idx) => answer === userAnswers[idx]
      );
      dispatch({ type: ACTION_TYPE.SET_RESULTS, payload: finalResults });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  useEffect(() => {
    if (results.length) {
      const numOfCorrectAnswers = calcCorrectAnswers(results);
      postResults({ date: Date.now(), result: results });
      setCorrectAnswers(numOfCorrectAnswers);
    }
  }, [results]);

  return (
    <div className={className}>
      <h3>Правильных ответов:</h3>
      <h4
        className={
          correctAnswers === results.length ? 'color-green' : 'color-red'
        }
      >
        {correctAnswers}/{results.length}
      </h4>
      <Buttons>
        <Button onClick={() => navigate('/')}>На главную</Button>
        <Button onClick={reloadTest}>Пройти еще раз</Button>
      </Buttons>
    </div>
  );
};

export const TestResult = styled(TestResultContainer)`
  text-align: center;
  & h3 {
    font-size: 40px;
  }

  & h4 {
    font-size: 30px;
  }

  & .color-green {
    color: green;
  }

  & .color-red {
    color: red;
  }
`;
