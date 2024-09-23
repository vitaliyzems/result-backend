import styled from 'styled-components';

export const CompleteBarContainer = ({ className, result }) => {
  return (
    <div className={className}>
      {result.map((isCorrect, idx) => (
        <div key={idx} className={isCorrect ? 'green' : 'red'} />
      ))}
    </div>
  );
};

export const CompleteBar = styled(CompleteBarContainer)`
  display: flex;
  width: 400px;
  padding: 5px 0;

  & div {
    height: 100%;
    flex: auto;
    border-right: 1px solid black;

    &:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    &:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      border-right: none;
    }
  }

  & .green {
    background-color: #28bc28;
  }

  & .red {
    background-color: #f03f3f;
  }
`;
