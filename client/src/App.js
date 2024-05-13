import React from 'react';
import './App.css';
import './styles/generic.css';
import './styles/buy.css'
import './styles/admin.css'
import './styles/footer.css'
import './styles/home.css'
import './styles/nav.css'
import './styles/content.css'
import './styles/groceries.css'
import './styles/loaderror.css'
import './styles/search.css'
import './styles/about.css'
import './styles/item.css'
import './styles/profile.css';
import './styles/userinfo.css';
import './styles/login.css';
import './styles/responsive.css';



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
import GroceriesPage from './pages/Groceries';

function App() {
  return (
    <Router>
      <Navigation />
      <Back/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/items" element={<Items />} />
        <Route path="/display" element={<Display />} />
        <Route path="/groceries" element={<GroceriesPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Delete" element={<Delete />} />
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
