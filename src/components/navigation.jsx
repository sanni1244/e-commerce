import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaUser, FaTimes, FaSearch } from 'react-icons/fa';
import { TiShoppingCart } from "react-icons/ti";
import { MdAppRegistration, MdLogin, MdLogout } from "react-icons/md";
import Categories from './Categories';
import logo from '../images/logo.jpg';
import bcrypt from 'bcryptjs'
import axios from 'axios';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const h1 = localStorage.getItem('loggedInUser');
    const hr = localStorage.getItem('hdfe');
    const [cartItems, setCartItems] = useState([]);
    const [change, setChange] = useState(true);
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

    useEffect(() => {
        if (h1) {
            bcrypt.compare(h1, hr, (err, result) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                } else {
                    if (result) {
                        console.log('');
                    } else {
                        window.location.href = '/login';
                    }
                }
            });
        }
    }, [])

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/cart/buy`, { params: { myusername: h1 } });
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };
        getCart();
    }, [cartItems]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('hdfe');
        setChange(!change)
    };

    return (
        <nav className={isHomePage ? 'hidden' : ''}>
            <div className='nav-bar'>
                <Link to={"/"}>
                <div className="logo">
                    <img src={logo} alt="logo" /> 
                    <span className='buyverse'>Buyverse</span>
                </div> 
                </Link>
                <div className='category123'>
                    <div className="sss11" onClick={toggleMenu}>
                        {isOpen ? <><FaTimes /></> : <><FaBars /> <span>Categories</span></>}
                    </div>
                    <CSSTransition in={isOpen} timeout={300}
                        classNames="fade"
                        unmountOnExit>
                        <p className='cat-hold'><Categories /></p>
                    </CSSTransition>
                </div>
                <div className="link">
                    <ul>
                        <Link to="/" className={`nav-link zxder ${location.pathname === '/' ? 'active-link' : ''}`}> Home</Link>
                        <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active-link' : ''}`}> About</Link>
                        <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active-link' : ''}`}> Services</Link>
                        {!h1 && (
                            <>
                                <Link to="/login" className="nav-link logoutin">
                                    Log in
                                </Link>
                                <Link to="/register" className="nav-link logoutin">
                                    Sign up
                                </Link>
                                <Link title='Login' to={"/login"}><span className='hot-prof logoutnow'><MdLogin /></span></Link>
                            </>
                        )}
                        {h1 && (
                            <>
                                <Link to="/login" className="nav-link logoutin" onClick={handleLogout}>
                                    Log out
                                </Link>
                                <Link title='Logout' onClick={handleLogout}><span className='nav-link logoutnow'><MdLogout/></span></Link>

                            </>)}
                    </ul>
                </div>
                <div className="user">
                    <Link to={"/search"}><span className='hot-prof'><FaSearch /></span></Link>
                    {h1 ? <Link to={"/profile"}><span className='hot-prof hot-prof1'><b>{h1.toUpperCase()}</b> <FaUser /></span></Link> : null}
                    <Link to={"/buy"}><span className='hot-prof hot-prof1'><TiShoppingCart /> {(cartItems.cart && <>({cartItems.cart.length})</>)  || 0}</span></Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
