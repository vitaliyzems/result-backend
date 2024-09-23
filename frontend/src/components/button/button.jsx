import styled from 'styled-components';

const ButtonContainer = ({ className, width, children, bgColor, ...props }) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export const Button = styled(ButtonContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  width: ${({ width = '100%' }) => width};
  height: 100%;
  border: 1px solid rgb(177, 177, 177);
  border-radius: 10px;
  color: ${({ disabled }) => (disabled ? '#fff' : '#000')};
  background-color: ${({ disabled, bgColor = '#fff' }) =>
    disabled ? '#aaa' : bgColor};

  &:hover {
    background-color: ${({ disabled, bgHover = '#333' }) =>
      disabled ? '#aaa' : bgHover};
    color: #fff;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  }
`;
