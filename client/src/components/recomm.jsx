import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useFetchItems from '../components/pickdatabase';
import axios from "axios";
import { GrFormEdit } from "react-icons/gr";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';


const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
const loggedInUser = localStorage.getItem('loggedInUser');


const Recomm = () => {
  const [auser, setUser] = useState(null)
  const { items, loading, error } = useFetchItems();



  useEffect(() => {
    const getRc = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/cart/buy`, { params: { myusername: loggedInUser } });
        setUser(response.data)

      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    getRc()
  }, [])
  useEffect(() => { }, [items, auser]);
  return (
    <div>
      <h2>Your browsing history</h2>
      {auser ? (
        <p>
          {auser.views.map((v, index) =>
            items.map((item, index) => (item.productId === v ?
              <div className="">
                <div className="showcasecontainer">
                  <div key={index} className={"productCard"}>
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
                            <b className="product-name">{item.productName.length > 40 ? item.productName.substring(0, 37) + "..." : item.productName} </b>
                            <p className="product-desc">
                              {item.productDescription.length > 64 ? item.productDescription.substring(0, 61) + "..." : item.productDescription}
                            </p>
                          </Link>
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
                            <b className="prd-price">{item.productPrice ? '₦' + item.productPrice.toLocaleString() : 'Unavailable'}</b>
                          </p>
                          {loggedInUser === "admin" && item.productId ? <p className='fixed-bottom'><Link to={`/edit?myid=${item.productId}`}><GrFormEdit style={{ color: "#263436de" }} /></Link></p> : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              : null))
          )}
        </p>
      ) : (
        null
      )}


    </div>
  )
}

export default Recomm
