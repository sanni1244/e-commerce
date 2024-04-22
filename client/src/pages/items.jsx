import Recomm from "../components/recomm";
import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { IoIosPricetag } from "react-icons/io";
import { TiWarning } from "react-icons/ti";
import { TbTruckDelivery } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { GrFormEdit } from "react-icons/gr";
import useFetchItems from '../components/pickdatabase';
import { useEffect } from 'react';
import axios from "axios";
import '../styles/item.css'
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

const Items = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const itemId = searchParams.get('item')
    const { items, loading, error } = useFetchItems();
    const [alternate, setAlternate] = useState(true);
    const [selectedValue, setSelectedValue] = useState('1');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rating, setRating] = useState(5);
    const loggedInUser = localStorage.getItem('loggedInUser');
    const [displayedComments, setDisplayedComments] = useState(4);
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/comments/${itemId}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    const handleReadMore = () => {
        setDisplayedComments(displayedComments + 5);
    };

    let count = 0;
    useEffect(() => {
        fetchComments();
    }, []);
    useEffect(() => {}, [items]);


    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
          <div className="error-container">
            <div className="error-content">
              <h2>Oops! Something went wrong.</h2>
              <b>{error.code === "ERR_NETWORK" ? error.message : "Error while fetching data "}: Try again</b> 
            </div>
          </div>
        );
      }

    if (!items[0]) {
        return (
            <div className="not-found-container">
                <div className="not-found-content">
                    <h5>"Ever noticed how online shopping turns 'just browsing' into a full-blown retail adventure? It's like stumbling into Narnia, but instead of lions and witches, it's all about deals and wishlists!"</h5>
                </div>
                <div className="loading-spinner"></div>
            </div>
        );
    }


    const handleComment = async (e) => {
        e.preventDefault();
        if (!loggedInUser) {
            setErrorMessage2('You need to log in to make comments!');
        }
        else {
            try {
                const response = await axios.post(`${SERVER_URL}/comments`, {
                    loggedInUser,
                    itemId,
                    comment,
                    rating
                });
                console.log(response.data.message);
                setErrorMessage2('You made a comment');
                setComment('')
                fetchComments();
            } catch (error) {
                if (error.response.status === 400) { setErrorMessage2('You already made a comment') }
                else {
                    console.error('Error submitting comment:', error.response.data.message);
                    setErrorMessage2(error.response.data.message);
                }
            }
        }
    };


    const handleBuyNowClick = () => {
        if (loggedInUser) {
            window.location.href = '/buy';

        } else {
            window.location.href = '/login';
            setErrorMessage('You have to login first!');
        }
    };


    const nextSlide = (item) => {
        setCurrentIndex((prevIndex) => (prevIndex === item.productImg.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = (item) => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? item.productImg.length - 1 : prevIndex - 1));
    };

    const getDeliveryDate = (item) => {
        let myDate = new Date();
        myDate.setDate(myDate.getDate() + item.deliveryTime);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = myDate.toLocaleDateString('en-US', options);
        return formattedDate
    }

    const options = [];
    for (let i = 1; i <= 10; i++) { // Options from 1 to 10
        options.push(<option key={i} value={i}>{i}</option>);
    }

    const addContent = async (e) => {
        setErrorMessage('Adding......');
        let myusername = loggedInUser;
        if (!myusername) {
            window.location.href = "/login"
        }
        else {
            try {
                const response = await axios.post(`${SERVER_URL}/cart/add`, { myusername, itemId, selectedValue })
                console.log(response.data);
                setErrorMessage('Successfully added to cart!');
                setAlternate(!alternate);
            }
            catch (error) {
                if (error.response.status === 400) {
                    setErrorMessage('Item was previously added to cart');
                }
                else {
                    console.error('Error logging in:', error);
                    setErrorMessage('Something went wrong!');
                }
            }
        }
    }

    const removeContent = async () => {
        setErrorMessage('Removing......');
        let myusername = loggedInUser;
        if (!myusername) {
            window.location.href = "/login"
        }
        try {
            const response = await axios.post(`${SERVER_URL}/cart/remove`, { myusername })
            console.log(response.data)
            setErrorMessage('Item removed from cart');
            setAlternate(!alternate);
        }
        catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Something went wrong!');
        }
    }
    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };

    return (
        <div>
            {items.map((item, index) => {
                if (item.productId === itemId) {
                    count++;
                    return (
                        <div className='' key={index}>
                            <div className="grid-items">
                                <div className="slider">
                                    <button className="prev" onClick={() => prevSlide(item)}>
                                        &#10094;
                                    </button>
                                    <button className="next" onClick={() => nextSlide(item)}>
                                        &#10095;
                                    </button>
                                    {item.productImg && item.productImg.map((image, index) => (
                                        <img key={index} className={index === currentIndex ? 'slide active2' : 'slide'} src={image}/>
                                    ))}
                                </div>
                                <div className="center-stage">
                                    <div className=""><h2 id={document.title = item.productName}>{item.productName}</h2></div>
                                    <div className="">
                                        <small>Brand: <Link to={`/search?query=${item.productBrand}`}>{item.productBrand || "Not Available"}</Link> &nbsp;&nbsp;
                                            {loggedInUser === "admin" ? <Link to={`/edit?myid=${item.productId}`}><GrFormEdit style={{ color: "black" }} /></Link> : ""}</small> &nbsp;&nbsp;&nbsp;
                                    </div>
                                    <p className="fg">{(() => {
                                        switch (item.productRatings) {
                                            case "5" || 5:
                                                return <><FaStar className='color-stars' /><FaStar className='color-stars' /><FaStar className='color-stars' /><FaStar className='color-stars' /><FaStar className='color-stars' /></>
                                            case "4" || 4:
                                                return <><FaStar className='color-stars' /><FaStar className='color-stars' /><FaStar className='color-stars' /><FaStar className='color-stars' /><CiStar /></>
                                            case "3" || 3:
                                                return <><FaStar className='color-stars' /><FaStar className='color-stars' /><FaStar className='color-stars' /><CiStar /><CiStar /></>
                                            case "2" || 2:
                                                return <><FaStar className='color-stars' /><FaStar className='color-stars' /><CiStar /><CiStar /><CiStar /></>
                                            case "1" || 1:
                                                return <><FaStar className='color-stars' /><CiStar /><CiStar /><CiStar /><CiStar /></>
                                            default:
                                                return <><CiStar /><CiStar /><CiStar /><CiStar /><CiStar /></>
                                        }
                                    })()}
                                    </p>
                                    <div className="dfffa"><p>{item.productDescription}</p></div>
                                    <div className="dfffa">{item.productAvailability ? <span style={{ color: "green" }}>Item is available</span> : <span style={{ color: "red" }}>Currently not available</span>}</div>
                                    <br />
                                    {
                                        item.aboutItem ?
                                            <div class='about-item-container'><h1 className='about-item-title'>About this item</h1><ul class='about-item-list'><li>
                                                <div className="dfffa" dangerouslySetInnerHTML={{ __html: item.aboutItem }} /></li></ul></div>
                                            :
                                            null
                                    }
                                </div>
                                <div className="box">
                                    <h4>Shipping Details</h4>
                                    <p><IoIosPricetag /> Item Price: {item.productPrice ? "₦" + item.productPrice : "Unavailable"}</p>
                                    <p><FaClipboardList /> Shipping & Import Fees: {item.shippingFee ? "₦" + item.shippingFee : "Free"}</p>
                                    <p><TiWarning /> Sales taxes may apply at checkout</p>
                                    <p><TbTruckDelivery /> Expected delivery Date: {getDeliveryDate(item)}</p>

                                    <p>
                                        Quantity &nbsp;  <select value={selectedValue} id="quantitySelect" onChange={handleSelectChange}>
                                            {options}
                                        </select>
                                    </p>
                                    <button className={`button ${alternate ? 'add-to-cart' : 'item-added'}`} onClick={alternate ? () => addContent() : () => removeContent()}>{alternate ? "Add to Cart" : "Item added"}</button>
                                    <br />
                                    <button className="button" onClick={handleBuyNowClick}>Buy Now</button>
                                    <p className="small-b">{errorMessage}</p>
                                </div>
                            </div>
                            <div className="img-group-padd">
                                <hr />
                                {
                                    (() => {
                                        if (item.itemImage> 0) {
                                            const imageElements = [];
                                            for (let i = 0; i < item.itemImage.length; i++) {
                                                imageElements.push(
                                                    <img key={i} className="img-size2" src={item.itemImage[i]} alt="" />
                                                );
                                            }
                                            return imageElements;
                                        }
                                        else {
                                            return null
                                        }
                                    })()
                                }
                            </div>
                            <div className="cmmt-section">
                                <h2>Leave a review</h2>
                                <form onSubmit={handleComment}>
                                    <textarea className="tx-ar"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Enter your comment...."
                                    ></textarea> <br /> <br />
                                    Rate this item &nbsp; &nbsp;
                                    <select value={rating} className="select-statement" onChange={(e) => setRating(e.target.value)} id="">
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select> <br />
                                    <button className="button spt-btton" type="submit">Submit</button>
                                </form>
                                {errorMessage2 && <p className="errbad">{errorMessage2}</p>} <br /><br /><br />
                                <div>
                                {comments.length > 0 ? (
    <>
        <h2>Users Reviews</h2>
        <div>
            {comments
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort comments by date
                .slice(0, displayedComments)
                .map((comment, index) => (
                    <div key={index}>
                        <div className="container-comments">
                            <div className="fl">
                                <p><b>{comment.loggedInUser}</b></p>
                                <p className="fg">
                                            {(() => {
                                                switch (Number(comment.rating)) {
                                                    case 5:
                                                        return <><FaStar className='color-stars' /><FaStar className='color-stars' /><FaStar className='color-stars' /><FaStar className='color-stars' /><FaStar className='color-stars' /></>;
                                                    case 4:
                                                        return <><FaStar className='color-stars' /><FaStar className='color-stars' /><FaStar className='color-stars' /><FaStar className='color-stars' /><CiStar /></>;
                                                    case 3:
                                                        return <><FaStar className='color-stars' /><FaStar className='color-stars' /><FaStar className='color-stars' /><CiStar /><CiStar /></>;
                                                    case 2:
                                                        return <><FaStar className='color-stars' /><FaStar className='color-stars' /><CiStar /><CiStar /><CiStar /></>;
                                                    case 1:
                                                        return <><FaStar className='color-stars' /><CiStar /><CiStar /><CiStar /><CiStar /></>;
                                                    default:
                                                        return <><CiStar /><CiStar /><CiStar /><CiStar /><CiStar /></>;
                                                }
                                            })()}
                                        </p>
                                    </div>
                                    <p>{comment.comment}</p>
                                    <p className="small-date">{`${new Date(comment.createdAt).toDateString()}`}</p>
                                </div>
                                <br />
                            </div>
                        ))}
                    </div>
                    {comments.length > displayedComments && (
                        <button className="button spt-btton" onClick={handleReadMore}>More comments</button>
                    )}
                </>
            ) : (
                <center>
                <h2 style={{border: "2px solid black", padding: "20px"}}>Be the first to leave a comment</h2></center>
            )}
        </div>
                            </div>
                            <Recomm />
                        </div>
                    )
                }
                else {
                    return null;
                }


            })}
            {
                count === 0 ? <div className="item-not-found-container">
                    <div className="item-not-found-content">
                        <h2>Item does not exist</h2>
                        <p>We couldn't find the item you're looking for.</p>
                    </div>
                </div> : null
            }

        </div>
    )
}
export default Items
