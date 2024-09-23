import { useState } from 'react';
import styled from 'styled-components';
import { Button, Buttons } from '../../../../components';
import { useDispatch } from 'react-redux';
import { editQuestionAsync } from '../../../../actions/edit-question-async';
import { addQuestionAsync } from '../../../../actions';

const QuestionFormContainer = ({ className, question, setAddingQuestion }) => {
  const [updatedQuestion, setUpdatedQuestion] = useState(question);
  const [newOption, setNewOption] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const changeQuestionTitle = ({ target }) => {
    setUpdatedQuestion({
      ...updatedQuestion,
      question: target.value,
    });
  };

  const addOption = () => {
    setError(null);
    if (!newOption.length) {
      setError('Вариант ответа не может быть пустым!');
      return;
    }

    const newQuestion = {
      ...updatedQuestion,
      options: [...updatedQuestion.options, newOption],
    };
    setUpdatedQuestion(newQuestion);
    setNewOption('');
  };

  const deleteOption = (deletingOption) => {
    const newQuestion = {
      ...updatedQuestion,
      options: updatedQuestion.options.filter(
        (option) => option !== deletingOption
      ),
      answer:
        updatedQuestion.answer === deletingOption
          ? null
          : updatedQuestion.answer,
    };
    setUpdatedQuestion(newQuestion);
  };

  const changeAnswer = (option) => {
    setUpdatedQuestion({ ...updatedQuestion, answer: option });
  };

  const cancelHandle = () => {
    if (!question._id) {
      setAddingQuestion(false);
    }
    setUpdatedQuestion(question);
    setError(null);
  };

  const saveQuestion = () => {
    setError(null);

    if (!updatedQuestion.question) {
      setError('Заголовок вопроса не может быть пустым!');
      return;
    }

    if (updatedQuestion.options.length < 2) {
      setError('Вариантов ответа должно быть как минимум 2!');
      return;
    }

    if (!updatedQuestion.answer) {
      setError('Выберите один правильный вариант ответа!');
      return;
    }

    if (updatedQuestion._id) {
      dispatch(editQuestionAsync(updatedQuestion));
    } else {
      dispatch(addQuestionAsync(updatedQuestion));
      setAddingQuestion(false);
    }
  };

  return (
    <div className={className}>
      <input
        className="question-title"
        value={updatedQuestion.question}
        onChange={changeQuestionTitle}
      />
      <div className="options-group">
        {updatedQuestion.options.map((option, idx) => (
          <div className="option-item" key={idx}>
            <label htmlFor={option}>{option}</label>
            <div>
              <input
                type="radio"
                name="answer"
                id={option}
                onChange={() => changeAnswer(option)}
                checked={option === updatedQuestion.answer}
              />
              <Button width="100px" onClick={() => deleteOption(option)}>
                Удалить
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="add-option-container">
        <input
          type="text"
          value={newOption}
          onChange={({ target }) => setNewOption(target.value)}
        />
        <Button onClick={addOption} width="50px">
          +
        </Button>
      </div>
      {error && <span className="error">{error}</span>}
      <Buttons>
        <Button onClick={cancelHandle} bgColor="#fd3a3a">
          Отмена
        </Button>
        <Button
          onClick={() => saveQuestion(updatedQuestion)}
          bgColor="lightgreen"
        >
          Сохранить
        </Button>
      </Buttons>
    </div>
  );
};

export const QuestionForm = styled(QuestionFormContainer)`
  border: 1px solid #666666;
  border-radius: 15px;
  margin-bottom: 10px;
  padding: 10px;

  & .question-title {
    width: 100%;
    font-size: 22px;
    border: 1px solid #666666;
    border-radius: 10px;
    padding: 5px 10px;
  }

  & .options-group {
    padding: 10px 0;

    & .option-item {
      width: 500px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      &:last-child {
        padding: 0;
      }

      & div {
        display: flex;
      }

      & input {
        margin-right: 10px;
        width: 20px;
      }
    }
  }

  & .add-option-container {
    display: flex;
    justify-content: space-between;
    width: 500px;
    height: 40px;
    margin-bottom: 20px;

    & input {
      flex: auto;
      margin-right: 50px;
      border: 1px solid #666666;
      border-radius: 10px;
      font-size: 22px;
      padding: 5px 10px;
    }
  }

  & .error {
    display: block;
    color: red;
    margin-bottom: 10px;
  }
`;
