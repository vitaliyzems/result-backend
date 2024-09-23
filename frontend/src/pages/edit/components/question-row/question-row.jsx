import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionForm } from '../question-form/question-form';
import { Button } from '../../../../components';
import { useDispatch } from 'react-redux';
import { removeQuestionAsync } from '../../../../actions';

const QuestionRowContainer = ({
  className,
  question,
  showingId,
  setShowingId,
  setAddingQuestion,
}) => {
  const [isShowForm, setIsShowForm] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (showingId === question._id) {
      setIsShowForm(true);
    } else {
      setIsShowForm(false);
    }
  }, [showingId, question]);

  const showFormHandle = () => {
    if (showingId === question._id) {
      setShowingId(null);
      return;
    }
    setShowingId(question._id);
  };

  const deleteQuestion = () => {
    dispatch(removeQuestionAsync(question._id));
  };

  return (
    <div className={className}>
      {question._id && (
        <div className="question-container">
          <div className="question-row" onClick={showFormHandle}>
            <p>{question.question}</p>
            <span className={isShowForm ? 'top' : 'bottom'}>&rang;</span>
          </div>
          <div className="delete-button">
            <Button onClick={deleteQuestion}>Удалить</Button>
          </div>
        </div>
      )}
      {isShowForm && (
        <QuestionForm
          question={question}
          setAddingQuestion={setAddingQuestion}
        />
      )}
    </div>
  );
};

export const QuestionRow = styled(QuestionRowContainer)`
  & .question-container {
    display: flex;
    height: 50px;
    margin-bottom: 10px;
  }

  & .question-row {
    flex: auto;
    border: 1px solid #666;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 20px;
    margin-right: 10px;

    &:hover {
      background-color: #bebebe;
    }

    & .top {
      transform: rotate(-90deg);
      margin-top: -10px;
    }

    & .bottom {
      transform: rotate(90deg);
      margin-bottom: -10px;
    }
  }
`;
