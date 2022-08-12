import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './components/cart/Cart';
import Issues from './components/cart/issue/Issues';
import List from './components/list/List';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/issues/:owner/:name" element={<Issues />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
