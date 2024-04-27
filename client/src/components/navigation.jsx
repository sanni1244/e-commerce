import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import logo from '../images/img.jpg';
import '../styles/nav.css';
import { useEffect } from 'react';
import { MdDesignServices, MdOutlineContactSupport, MdLogin, MdLogout } from "react-icons/md";
import { FaBars, FaTimes, FaSearch, FaUserCircle } from 'react-icons/fa';
import { TiShoppingCart } from "react-icons/ti";
import { ImHome3 } from "react-icons/im";

let themeC = localStorage.getItem('themeColor') || "#967BB6"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [change, setChange] = useState(true);
    const loggedInUser = localStorage.getItem('loggedInUser');
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setChange(!change)
    };

    useEffect(() => { }, [change])
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        window.location.href = `/search?query=${searchQuery}`;
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img className="logo" src={logo} alt="Logo" />
                </Link>
                <Link to="/" className="title">Cash Rizz</Link>
            </div>
            <div className="">
                <form onSubmit={handleSearchSubmit} className="search-form">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <button type="submit" className="search-button1">
                        <FaSearch className="search-icon" />
                    </button>
                </form>
            </div>
            <div className={`navbar-links ${isOpen ? 'active1' : ''}`}>
                <Link to="/" className="nav-link"><ImHome3/> &nbsp; Home</Link>
                <Link to="/about" className="nav-link"> <MdOutlineContactSupport/> &nbsp; About</Link>
                <Link to="/services" className="nav-link"><MdDesignServices/> &nbsp; Services</Link>
                {!loggedInUser ? (
                    <>
                        <Link to="/login" className="nav-link">
                            <MdLogin className="nav-icon" />
                            Log in
                        </Link>
                        <Link to="/register" className="nav-link">
                            <FaUserCircle className="nav-icon" />
                            Sign up
                        </Link>
                    </>
                ) : (
                    <Link to="/profile" className='nav-link'>
                        <FaUserCircle className={themeC === '#000000' ? 'nav-icon prof white' : 'nav-icon prof'}/>
                        <span className={themeC === '#000000' ? 'prof white' : 'prof'}>{loggedInUser.toUpperCase()}</span>
                    </Link>
                )}
                {loggedInUser && (
                    <Link to="/login" className="nav-link" onClick={handleLogout}>
                        <MdLogout className="nav-icon" />
                        Log out
                    </Link>
                )}
                <Link to="/buy" className="nav-link">
                    <TiShoppingCart />
                </Link>

            </div>
            <div className="navbar-hamburger" onClick={toggleMenu}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>
            <CSSTransition
                in={isOpen}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                <div className="mobile-menu">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/services" className="nav-link">Services</Link>
                    {!loggedInUser ? (
                        <>
                            <Link to="/login" className="nav-link">
                                <MdLogin className="nav-icon" />
                                Log in
                            </Link>
                            <Link to="/register" className="nav-link">
                                <FaUserCircle className="nav-icon" />
                                Sign up
                            </Link>
                        </>
                    ) : (
                        <Link to="/profile" className="nav-link">
                            <FaUserCircle className={themeC === '#000000' ? 'nav-icon prof white' : 'nav-icon prof'} />
                            <span className={themeC === '#000000' ? 'prof white' : 'prof'}>
                            {loggedInUser.toUpperCase()}
                            </span>
                            
                        </Link>
                    )}
                    {loggedInUser && (
                        <Link to="/" className="nav-link" onClick={handleLogout}>
                            <MdLogout className="nav-icon" />
                            Log out
                        </Link>
                    )}
                    <Link to="/buy" className="nav-link">
                        <TiShoppingCart /> &nbsp; Buy
                    </Link>
                </div>
            </CSSTransition>
        </nav>
    );
};

export default Navbar;
