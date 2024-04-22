import React from 'react';
import Categories from '../components/Categories';
import LoadPage from '../components/hero';
import '../styles/home.css'


import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { GrFormEdit } from "react-icons/gr";


const Home = () => {
    document.title = "Rizz Store"
    return (
        <div className="App">
            <div className='grid-option'>
                <Categories />
                <LoadPage />





                {/* <div className='showcaseheader'>
                    <center><h2>Apple Deals 📱🎧💻</h2></center>
                    <div className='showcasecontainer'>
                        <div className='productCard' >


                            <div className='written-content'>
                                <div className='img-container'>
                                    <img
                                        className='img-style' src='https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Dell-XPS-15-OLED-laptop.jpg'
                                    />
                                </div>
                                <div className='prod-details'>
                                    <div className="cot-tain">
                                        <a href='' className="link-color">
                                            <b className="product-name">DELL XPS 15 9530 CORE I9-13900H 2TB SSD 64GB RAM,8GB NVIDIA RTX 4070,15.6</b>
                                            <p className="product-desc">13th Generation Intel(R) Core(TM) i9-13900H Processor (14-Core, 24MB Cache, up to 5.4GHz) 64GB (2x32GB) DDR5, 4800MHz 2TB M.2 PCIe</p>
                                        </a>
                                    </div>
                                    <span>
                                        <p className='fg'>
                                            <FaStar className="color-stars" />
                                            <FaStar className="color-stars" />
                                            <FaStar className="color-stars" />
                                            <FaStar className="color-stars" />
                                            <CiStar />
                                            <b className="prd-price">₦ 5770000</b>
                                        </p>

                                        <GrFormEdit className='fixed-bottom' style={{ color: "#263436de" }} />
                                    </span>
                                </div>
                            </div>
                        </div>
                </div>

                    </div> */}
            </div>
        </div>
    )
}

export default Home
