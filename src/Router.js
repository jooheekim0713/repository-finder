import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import Issues from './components/Issues';
import List from './components/List';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/issues" element={<Issues />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
