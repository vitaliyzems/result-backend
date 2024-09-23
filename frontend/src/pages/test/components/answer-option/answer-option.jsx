import styled from 'styled-components';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserAnswers } from '../../../../selectors';

const AnswerOptionContainer = ({
  className,
  id,
  value,
  selectedOption,
  setSelectedOption,
  currentIdx,
}) => {
  const userAnswers = useSelector(selectUserAnswers);

  useEffect(() => {
    if (userAnswers[currentIdx] === value) {
      setSelectedOption(value);
    }
  }, [setSelectedOption, currentIdx, userAnswers, value]);

  const isChecked = selectedOption === value;

  return (
    <div className={className}>
      <input
        type="radio"
        id={id}
        name="answer-option"
        value={value}
        checked={isChecked}
        onChange={({ target }) => setSelectedOption(target.value)}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};

export const AnswerOption = styled(AnswerOptionContainer)`
  width: 600px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;

  & :last-child {
    margin-bottom: 0;
  }

  & label {
    width: 548px;
    display: flex;
    align-items: center;
    margin-left: 20px;
    cursor: pointer;
  }

  & input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    border-radius: 50%;
    width: 32px;
    height: 32px;

    border: 2px solid #999;
    transition: 0.2s all linear;
    outline: none;
    margin: 0;
    cursor: pointer;
  }

  input:checked {
    border: 16px solid green;
  }
`;
