import styled from 'styled-components';

const LayoutContainer = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const Layout = styled(LayoutContainer)`
  width: 60vw;
  margin: 100px auto;
`;
