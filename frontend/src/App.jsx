import { Route, Routes } from 'react-router-dom';
import { Edit, Main, Test } from './pages';
import { Layout } from './components';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<Test />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </Layout>
  );
};
