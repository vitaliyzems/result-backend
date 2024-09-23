import styled from 'styled-components';
import { CompleteBar } from '../complete-bar/complete-bar';

const HistoryItemContainer = ({ className, resultHistory }) => {
  const { result, correctCount, count } = resultHistory;
  const date = new Date(resultHistory.date);

  return (
    <div className={className}>
      <div>
        <div className="date">
          {date.toLocaleDateString()}
          <br />
          <span>{date.toLocaleTimeString()}</span>
        </div>
        <CompleteBar result={result} />
      </div>
      <div>
        Верно: {correctCount} из {count}
      </div>
    </div>
  );
};

export const HistoryItem = styled(HistoryItemContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #333333;
  border-radius: 10px;
  height: 50px;
  padding: 0 20px;
  margin-bottom: 10px;

  & > div {
    display: flex;
    justify-content: space-between;
  }

  & .date {
    margin-right: 280px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  & span {
    font-size: 12px;
  }
`;
