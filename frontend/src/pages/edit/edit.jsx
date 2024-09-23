import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectQuestions } from '../../selectors';
import { useEffect, useState } from 'react';
import { fetchQuestionsAsync } from '../../actions';
import { QuestionRow } from './components';
import { Button } from '../../components';
import { useNavigate } from 'react-router-dom';

const EditContainer = ({ className }) => {
  const questions = useSelector(selectQuestions);
  const [showingId, setShowingId] = useState(null);
  const [addingQuestion, setAddingQuestion] = useState(false);

  const newQuestion = {
    question: '',
    options: [],
    answer: null,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchQuestionsAsync());
  }, [dispatch]);

  const showAddQuestionForm = () => {
    setAddingQuestion(true);
    setShowingId(null);
  };

  return (
    <div className={className}>
      <div className="go-home-button">
        <Button onClick={() => navigate('/')}>На главную</Button>
      </div>
      <div>
        {questions.map((question) => (
          <QuestionRow
            key={question._id}
            question={question}
            showingId={showingId}
            setShowingId={setShowingId}
          />
        ))}
      </div>
      {addingQuestion ? (
        <QuestionRow
          question={newQuestion}
          setAddingQuestion={setAddingQuestion}
        />
      ) : (
        <div className="add-button">
          <Button onClick={showAddQuestionForm}>+</Button>
        </div>
      )}
    </div>
  );
};

export const Edit = styled(EditContainer)`
  font-size: 22px;
  cursor: pointer;

  & .go-home-button {
    height: 50px;
    width: 200px;
    margin-bottom: 20px;
  }

  & .add-button {
    height: 50px;
    font-size: 22px;
  }
`;
