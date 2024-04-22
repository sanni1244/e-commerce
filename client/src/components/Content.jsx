import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { GrFormEdit } from "react-icons/gr";
import '../styles/content.css';

const loggedInUser = localStorage.getItem('loggedInUser');
const Content = ({ item }) => (
    <div className='written-content'>
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
            <div className='img-container'><img className='img-style' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="No img" /></div>
        )}
        <div className='prod-details'>
            <div className="cot-tain">
                <Link to={`/items?item=${item.productId}`} className="link-color">
                    <b className="product-name">{item.productName.substring(0, 70)}</b>
                    <p className="product-desc">{item.productDescription.substring(0, 90) + '....'}</p>
                </Link>
            </div>
            <span>
                <p className='fg'>
                    {[...Array(parseInt(item.productRatings))].map((_, index) => (
                        <FaStar key={index} className="color-stars" />
                    ))}
                    {[...Array(5 - parseInt(item.productRatings))].map((_, index) => (
                        <CiStar key={index} />
                    ))}
                    <b className="prd-price">{item.productPrice ? '₦' + item.productPrice : 'Unavailable'}</b>
                </p>

                {loggedInUser === "admin" && item.productId ? <p className='fixed-bottom'><Link to={`/edit?myid=${item.productId}`}><GrFormEdit style={{ color: "#263436de" }} /></Link></p> : ""}
            </span>
        </div>
    </div>

    
);

export default Content;
