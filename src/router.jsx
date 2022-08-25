import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './components/cart/cart';
import Issues from './components/cart/issue/Issues';
import List from './components/list/list';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cart/:owner/:name" element={<Issues />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
