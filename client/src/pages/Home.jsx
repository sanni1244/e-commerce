import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import background from '../images/img.jpg';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import logo from '../images/l.png';
import { CSSTransition } from 'react-transition-group';
import { MdOutlineLaptopChromebook, MdElectricalServices } from "react-icons/md";
import { FaBars, FaUser, FaTimes, FaSearch } from 'react-icons/fa';
import { GiWineBottle } from "react-icons/gi";
import { TiShoppingCart } from "react-icons/ti";
import { IoShirt, IoGameController } from "react-icons/io5";
import { BsPhone } from "react-icons/bs";
import Ratings from '../components/highratings';
import Apple from '../components/Appledeals';
import Clothes from '../components/Clothes';
import Gaming from '../components/gaming';
import Categories from '../components/Categories';
import bcrypt from 'bcryptjs'


const BackgroundPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const h1 = localStorage.getItem('loggedInUser');
    const hr = localStorage.getItem('hdfe');
    const [change, setChange] = useState(true);

 

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

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        window.location.href = `/search?query=${searchQuery}`;
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('hdfe');
        setChange(!change)
    };

    return (
        <div className='container'>
            <nav>
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
                        <Link to={"/buy"}><span className='hot-prof'><TiShoppingCart /></span></Link>
                    </div>
                </div>
            </nav>
            <section className='hero-section'>
                <div className="background-container">
                    <img src={background}
                        alt="Background Image"
                        className="background-image" />
                    <div className="content">
                        <h1>Shopping for all</h1>
                        <p>Discover the ideal gift for your loved ones or treat yourself to a gift of self-love.</p>
                        <div className="">
                            <form onSubmit={handleSearchSubmit} className="search-form">
                                <input
                                    type="text"
                                    placeholder={"Search..."}
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="search-input" />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className='first-class'>
                <div className="category-show">
                    <h2>Categories</h2>
                </div>
                <div className="showcase">
                    <Link to={`/products?subcat=clothing`}>
                        <div className="box-cat">
                            <IoShirt className='box-cat cat-icon' />
                            <span>Clothes and footwear</span>
                        </div>
                    </Link>
                    <Link to={`/products?subcat=laptop`}>
                        <div className="box-cat">
                            <MdOutlineLaptopChromebook className='box-cat cat-icon' />
                            <span>Laptops</span>
                        </div>
                    </Link>
                    <Link to={`/products?subcat=phones`}>
                        <div className="box-cat">
                            <BsPhone className='box-cat cat-icon' />
                            <span>Mobile Phones</span>
                        </div>
                    </Link>
                    <Link to={`/products?subcat=electronics`}>
                        <div className="box-cat">
                            <MdElectricalServices className='box-cat cat-icon' />
                            <span>Electronic gadgets</span>
                        </div>
                    </Link>
                    <Link to={`/products?subcat=video`}>
                        <div className="box-cat bb2">
                            <IoGameController className='box-cat cat-icon' />
                            <span>Video Game</span>
                        </div>
                    </Link>
                    <Link to={`/products?subcat=drinks`}>
                        <div className="box-cat bb3">
                            <GiWineBottle className='box-cat cat-icon' />
                            <span>Drinks</span>
                        </div>
                    </Link>
                </div>
            </section>



            <section className='showcase-flash'>
                <div className="category-show">
                    <p>Most Popular</p>
                    <p>Show More</p>
                </div>
                <div className="">
                    <Ratings />
                </div>
            </section>
            <section className='showcase-flash'>
                <div className="cover-up">
                    <div className="category-show">
                        <p>Apple products</p>
                        <p>Show More</p>
                    </div>
                    <div className="">
                        <Apple />
                    </div>
                </div>
            </section>
            <section className='my-groceries'>
                <div className="border-class">
                    <img className='img-side' src={img1} alt="" />
                    <div className="content9">
                        <h2>Groceries</h2>
                        <div className="flex">
                            <ul className='groceries-list'>
                                <li><Link to="/groceries#drinks-section">Drinks, Wine & Liquor</Link></li>
                                <li><Link to="/groceries#food-section">Foodstuff</Link></li>
                                <li><Link to="/groceries#household-section">Household care</Link></li>
                            </ul>
                            <ul className='groceries-list'>
                                <li><Link to="/groceries#snacks-section">Snacks and Junks</Link></li>
                                <li><Link to="/groceries#perfumes-section">Fragrance</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className='showcase-flash'>
                <div className="category-show">
                    <p>Clothing Isle</p>
                    <p>Show More</p>
                </div>
                <div className="">
                    <Clothes />
                </div>
            </section >
            <section className="deals-section">
                <div className="deals-image">
                    <img src={img2} alt="Main Image" />
                </div>
                <div className="deals-content">
                    <h2>🎉 Get 10% Off on All Gaming Deals!</h2>
                    <p>🚀 Dive into our latest deals and enjoy a whopping 10% discount on all products. Don't miss out on this amazing offer!</p>
                </div>
            </section>
            <section className='showcase-flash'>
                <div className="cover-up">
                    <div className="category-show">
                        <p>Clothing Isle</p>
                        <p>Show More</p>
                    </div>
                    <div className="">
                        <Gaming />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BackgroundPage;

