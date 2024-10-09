import { Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import { Appointment, DoctorsPage, SignIn } from './pages';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Appointment />} />
        <Route path="/auth" element={<SignIn />} />
        <Route path="/appointments" element={<DoctorsPage />} />
      </Routes>
    </Layout>
  );
};
