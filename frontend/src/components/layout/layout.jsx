import styled from 'styled-components';

const LayoutContainer = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const Layout = styled(LayoutContainer)`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;
