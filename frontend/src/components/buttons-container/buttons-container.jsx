import styled from 'styled-components';

const ButtonsContainer = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const Buttons = styled(ButtonsContainer)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  height: 60px;
`;
