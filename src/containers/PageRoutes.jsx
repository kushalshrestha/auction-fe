import { Navigate, Route, Routes } from 'react-router-dom';

export default function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/sign-in" element={<h1>Sign In Page</h1>} />
      <Route path="/sign-up" element={<h1>Sign Up Page</h1>} />
      <Route path="/test" element={<h1>Test Page</h1>} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}
