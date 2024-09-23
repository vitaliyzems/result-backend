import styled from 'styled-components';
import { Button, Buttons, History } from '../../components';
import { useNavigate } from 'react-router-dom';

const MainContainer = ({ className }) => {
  const navigate = useNavigate();
  return (
    <div className={className}>
      <Buttons>
        <Button onClick={() => navigate('/test')}>Запустить тест</Button>
        <Button onClick={() => navigate('/edit')} bgColor="#fff">
          Редактировать тест
        </Button>
      </Buttons>
      <History />
    </div>
  );
};

export const Main = styled(MainContainer)``;
