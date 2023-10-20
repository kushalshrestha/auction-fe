import { Route, Routes } from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export default function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/test" element={<h1>Test Page</h1>} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}
