import styled from 'styled-components';
import { HistoryItem } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectResultsHistory } from '../../selectors/select-results-history';
import { useEffect } from 'react';
import { fetchResultsAsync } from '../../actions';

const HistoryContainer = ({ className }) => {
  const resultsHistory = useSelector(selectResultsHistory);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResultsAsync());
  }, [dispatch]);

  return (
    <div className={className}>
      <h3>История прохождений</h3>
      {resultsHistory.map(({ _id, ...resultHistory }) => (
        <HistoryItem key={_id} resultHistory={resultHistory} />
      ))}
    </div>
  );
};

export const History = styled(HistoryContainer)`
  margin-top: 50px;
`;
