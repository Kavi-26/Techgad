import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ProductList from './pages/ProductList';
import DiscountProducts from './pages/DiscountProducts';
import WeeklySpecial from './pages/WeeklySpecial';
import Payment from './pages/Payment';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/productlist' element={<ProductList />} />
        <Route path='/discountproducts' element={<DiscountProducts />} />
        <Route path='/weeklyspecial' element={<WeeklySpecial />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;
