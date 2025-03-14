import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useFetchItems from '../components/pickdatabase';
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
const loggedInUser = localStorage.getItem('loggedInUser');

const Recomm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('item');
  const [auser, setUser] = useState(null);
  const { items } = useFetchItems();
  const scrollContainerRef = useRef(null);
  const scrollInterval = useRef(null);

  useEffect(() => {
    const getRc = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/cart/buy`, { params: { myusername: loggedInUser } });
        setUser(response.data);

        if (itemId) {
          await axios.put(`${SERVER_URL}/addhist`, { username: loggedInUser, views1: itemId });
        }
      } catch (error) {
        console.error('Error fetching list:', error);
      }
    };
    getRc();
  }, [itemId]);

  const startScrolling = (direction) => {
    if (scrollContainerRef.current) {
      scrollInterval.current = setInterval(() => {
        scrollContainerRef.current.scrollLeft += direction * 140; 
      }, 140); 
    }
  };

  const stopScrolling = () => {
    clearInterval(scrollInterval.current);
  };

  const filteredViews = auser && auser.views ? auser.views.filter((v, index, self) => {
    const lastIndex = self.lastIndexOf(v);
    return lastIndex === index && lastIndex !== self.length - 1 && v !== itemId;
  }).reverse() : [];

  return (
    <div>
      {filteredViews.length > 3 && (
        <div className='rshow'>
          <h2>Your browsing history</h2>
          <div className="scroll-container">
            {/* Left Scroll Button */}
            <button
              className="scroll-btn left"
              onMouseDown={() => startScrolling(-1)}
              onMouseUp={stopScrolling}
              onMouseLeave={stopScrolling}
            >
              <FaChevronLeft />
            </button>

            <div className='showcasecontainer1' ref={scrollContainerRef}>
              {filteredViews.map((v, index) => {
                const latestViewIndex = items.findIndex(item => item.productId === v);
                const latestView = latestViewIndex !== -1 ? items[latestViewIndex] : null;

                return (
                  latestView && (
                    <div key={index} className="productCard">
                      <Link to={`/items?item=${latestView.productId}`} className="link-color ">
                        {latestView.productImg && latestView.productImg[0] ? (
                          <div className='img-container'>
                            <img
                              className='img-style'
                              src={latestView.productImg[0]}
                              alt={latestView.productName}
                              onError={(e) => { e.target.onerror = null; e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'; }}
                            />
                          </div>
                        ) : (
                          <div className='img-container'>
                            <img className='img-style' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" alt="No img" />
                          </div>
                        )}
                        <div className='prod-details'>
                          <b className="product-name">{latestView.productName.length > 40 ? latestView.productName.substring(0, 37) + "..." : latestView.productName}</b>
                          <span>
                            <p className='fg'>
                              {[...Array(Math.floor(latestView.productRatings))].map((_, index) => (
                                <FaStar key={index} className='color-stars' />
                              ))}
                              {latestView.productRatings % 1 !== 0 && <FaStarHalfAlt key="half" className='color-stars' />}
                              {[...Array(5 - Math.ceil(latestView.productRatings))].map((_, index) => (
                                <FaRegStar key={index} className='color-stars' />
                              ))}
                              <b className="prd-price">{latestView.productPrice ? '₦' + latestView.productPrice.toLocaleString() : 'Unavailable'}</b>
                            </p>
                          </span>
                        </div>
                      </Link>
                    </div>
                  )
                );
              })}
            </div>

            {/* Right Scroll Button */}
            <button
              className="scroll-btn right"
              onMouseDown={() => startScrolling(1)}
              onMouseUp={stopScrolling}
              onMouseLeave={stopScrolling}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recomm;
