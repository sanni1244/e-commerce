import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { GrFormEdit } from "react-icons/gr";
import empt from "../images/none.png";


const loggedInUser = localStorage.getItem('loggedInUser');
const Content = ({ item, discount, discountVal }) => (
    <div className='written-content'>
        <Link to={`/items?item=${item.productId}`} className="link-color">
            {item.productImg && item.productImg[0] ? (
                <div className='img-container'>
                    <img
                        className='img-style'
                        src={item.productImg[0]}
                        alt={item.productName}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'; }}
                    />
                </div>
            ) : (
                <div className='img-container'><img className='img-style' src={empt} alt="No img" /></div>
            )}
            <div className='prod-details'>
                <div className="cot-tain">

                    <b className="product-name">{item.productName.length > 40 ? item.productName.substring(0, 37) + "..." : item.productName} </b>
                    <p className="product-desc">
                        {item.productDescription.length > 64 ? item.productDescription.substring(0, 61) + "..." : item.productDescription}
                    </p>

                </div>
                <span>
                    <p className='fg'>
                        {[...Array(Math.floor(item.productRatings))].map((_, index) => (
                            <FaStar key={index} className='color-stars' />
                        ))}
                        {item.productRatings % 1 !== 0 && <FaStarHalfAlt key="half" className='color-stars' />}
                        {[...Array(5 - Math.ceil(item.productRatings))].map((_, index) => (
                            <FaRegStar key={index} className='color-stars' />
                        ))}
                        {discount ?
                            <>
                                <b className="prd-price discount-price ">{item.productPrice ? '₦' + item.productPrice.toLocaleString() : 'Unavailable'}</b>
                                <span className="prd-price prd-price1">{'₦' + (item.productPrice + ((item.productPrice * discountVal / 100) || (item.productPrice * 10 / 100))).toLocaleString()}</span>
                            </>
                            :
                            <b className="prd-price">{item.productPrice ? '₦' + item.productPrice.toLocaleString() : 'Unavailable'}</b>
                        }

                    </p>
                    {loggedInUser === "admin" && item.productId ? <p className='fixed-bottom'><Link to={`/edit?myid=${item.productId}`}><GrFormEdit style={{ color: "#263436de" }} /></Link></p> : ""}
                </span>
            </div>
        </Link>
    </div>


);

export default Content;