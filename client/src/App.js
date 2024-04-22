import React from 'react';
import './App.css';
import Navigation from './components/navigation';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Items from './pages/items';
import Buy from './pages/Buy';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Admin from './pages/admin';
import Edit from './pages/Edit';
import Delete from './pages/Delete.jsx';
import Create from './pages/Create';
import Display from './pages/display';
import AboutUsPage from './pages/About';
import Services from './pages/Services';
import NotFoundPage from './pages/NotFound';
import Profile from './pages/profile';
import Back from './components/back';

function App() {
  return (
    <Router>
      <Navigation />
      <Back />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/items" element={<Items />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/create" element={<Create />} />
        <Route path="/Delete" element={<Delete />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/display" element={<Display />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
