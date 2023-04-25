import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Products from './pages/Products';
import EditProduct from "./pages/EditProduct"
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/'>
          <Route path='/' element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path='products/edit' element={<EditProduct />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
