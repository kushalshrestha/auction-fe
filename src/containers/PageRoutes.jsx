import { Route, Routes } from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import TestPage from '../components/TestPage';
import ProductList from '../components/product-list/ProductList';
import ProductDetail from '../components/product/ProductDetail';

export default function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/products" element={<ProductList/>} />
      <Route path="/product-detail" element={<ProductDetail/>} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}
