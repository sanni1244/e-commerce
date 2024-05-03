import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaUser, FaTimes, FaSearch } from 'react-icons/fa';
import { TiShoppingCart } from "react-icons/ti";
import Categories from './Categories';
import logo from '../images/l.png';
import bcrypt from 'bcryptjs'
import axios from 'axios';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const h1 = localStorage.getItem('loggedInUser');
    const hr = localStorage.getItem('hdfe');
    const [cartItems, setCartItems] = useState([]);
    const [change, setChange] = useState(true); 
    const loggedInUser = localStorage.getItem('loggedInUser');
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
                const response = await axios.get(`${SERVER_URL}/cart/buy`, { params: { myusername: loggedInUser } });
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
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <span>Rizz</span>
                </div>
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
                        <Link to="/" className="nav-link"> Home</Link>
                        <Link to="/about" className="nav-link"> About</Link>
                        <Link to="/services" className="nav-link"> Services</Link>
                        {!h1 ? (
                            <>
                                <Link to="/login" className="nav-link">
                                    Log in
                                </Link>
                                <Link to="/register" className="nav-link">
                                    Sign up
                                </Link>
                            </>
                        ) : (
                            <Link to="/profile" className='nav-link'>
                                <span className='hot-prof'>{h1.toUpperCase()}</span>
                            </Link>
                        )}
                        {h1 && (
                            <Link to="/login" className="nav-link" onClick={handleLogout}>
                                Log out
                            </Link>
                        )}
                    </ul>
                </div>
                <div className="user">
                    <Link to={"/search"}><span className='hot-prof'><FaSearch /></span></Link>
                    <Link to={"/profile"}><span className='hot-prof'><FaUser /></span></Link>
                    <Link to={"/buy"}><span className='hot-prof hot-prof1'><TiShoppingCart /> {cartItems.cart &&<>({cartItems.cart.length})</>}</span></Link>
                    
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
