import React, { useState, useEffect } from 'react';
import background from '../images/img.jpg';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';

import { Cat1 } from "../resources/categories";
import logo from '../images/l.png';
import { MdOutlineLaptopChromebook, MdElectricalServices, MdDesignServices, MdOutlineContactSupport, MdLogin, MdLogout } from "react-icons/md";
import { FaBars, FaTimes, FaSearch, FaUserCircle } from 'react-icons/fa';
import { TiShoppingCart } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { IoShirt, IoGameController } from "react-icons/io5";
import { BsPhone } from "react-icons/bs";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import Ratings from '../components/highratings';
import Apple from '../components/Appledeals';


import Clothes from '../components/Clothes';
import Gaming from '../components/gaming';


const BackgroundPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [change, setChange] = useState(true);
    localStorage.setItem('loggedInUser', 'admin');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        window.location.href = `/search?query=${searchQuery}`;
    };

    useEffect(() => { }, [change])
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };



    return (
        <div className='container'>
            <nav>
                <div className='nav-bar'>
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <span>Rizz</span>
                    </div>
                    <div className="logo category">
                        <FaBars /> <span>Categories</span>
                    </div>
                    <div className="link">
                        <ul>
                            <li><a href="">Login</a></li>
                            <li><a href="">Service</a></li>
                            <li><a href="">Contacts</a></li>
                            <li><a href="">About</a></li>
                        </ul>
                    </div>
                    <div className="user">
                        <FaSearch />
                        <FaUserCircle />
                        <TiShoppingCart />
                    </div>
                </div>
            </nav>
            <section>
                <div className="background-container">
                    <img
                        src={background}
                        alt="Random Cartoonish Image"
                        className="background-image"
                    />
                    <div className="content">
                        <h1>Shopping for all</h1>
                        <p>Discover the ideal gift for your loved ones or treat yourself to a gift of self-love.</p>
                        <div className="">
                            <form onSubmit={handleSearchSubmit} className="search-form">
                                <input
                                    type="text"
                                    placeholder={"🔎 Search..."}
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="search-input"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="category-show">
                    <p>Category</p>
                    <p>Show More</p>
                </div>
                <div className="showcase">
                    <Link>
                        <div className="box-cat">
                            <IoShirt className='box-cat cat-icon' />
                            <span>Clothes and footwear</span>
                        </div>
                    </Link>
                    <Link>
                        <div className="box-cat">
                            <MdOutlineLaptopChromebook className='box-cat cat-icon' />
                            <span>Laptops</span>
                        </div>
                    </Link>
                    <Link>
                        <div className="box-cat">
                            <BsPhone className='box-cat cat-icon' />
                            <span>Mobile Phones</span>
                        </div>
                    </Link>
                    <Link>
                        <div className="box-cat">
                            <MdElectricalServices className='box-cat cat-icon' />
                            <span>Electronic gadgets</span>
                        </div>
                    </Link>
                    <Link>
                        <div className="box-cat">
                            <IoGameController className='box-cat cat-icon' />
                            <span>Video Game</span>
                        </div>
                    </Link>
                    <Link>
                        <div className="box-cat">
                            <PiTelevisionSimpleBold className='box-cat cat-icon' />
                            <span>Television</span>
                        </div>
                    </Link>
                </div>
            </section>



            <section>
                <div className="category-show">
                    <p>Most Popular</p>
                    <p>Show More</p>
                </div>
                <div className="">
                    <Ratings />
                </div>
            </section>
            <section>
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
            <section>
                <div className="border-class">
                    <img className='img-side' src={img1} alt="" />
                    <div className="content9">
                        <h2>Groceries</h2>
                        <div className="flex">
                            <ul className='groceries-list'>
                                <li><Link to="/groceries#drinks-section">Drinks, Wine & Liquor</Link></li>
                                <li><Link to="/groceries#food-section">Foodstuff</Link></li>
                            </ul>
                            <ul className='groceries-list'>
                                <li><Link to="/groceries#snacks-section">Snacks and Junks</Link></li>
                                <li><Link to="/groceries#perfumes-section">Perfumes</Link></li>
                                <li><Link to="/groceries#household-section">Household care</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="category-show">
                    <p>Clothing Isle</p>
                    <p>Show More</p>
                </div>
                <div className="">
                    <Clothes />
                </div>
            </section>
            <section className="deals-section">
                <div className="deals-image">
                    <img src={img2} alt="Main Image" />
                </div>
                <div className="deals-content">
                    <h2>🎉 Get 10% Off on All Gaming Deals!</h2>
                    <p>🚀 Dive into our latest deals and enjoy a whopping 10% discount on all products. Don't miss out on this amazing offer!</p>
                </div>
            </section>
            <section>
                <div className="category-show">
                    <p>Clothing Isle</p>
                    <p>Show More</p>
                </div>
                <div className="">
                    <Gaming />
                </div>
            </section>


        </div>
    );
}

export default BackgroundPage;









// {Cat1.map((category, index) => (
//     <div key={category.id} className={`category`}>
//         <h3>{category.Department}</h3>
//         <ul className={`sub-menu`}>
//             {category.SubCategories.map((subCategory, subIndex) => (
//                 <li className='sublinkclass' key={subIndex}>
//                     <Link to={`/products?cat=${encodeURIComponent(category.Department)}&subcat=${encodeURIComponent(subCategory)}`}>{subCategory}</Link>
//                 </li>
//             ))}
//         </ul>
//     </div>
// ))}