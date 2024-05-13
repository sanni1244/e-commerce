import Recomm from "../components/recomm";
import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaCheck, FaStarOfDavid, FaLock } from "react-icons/fa";
import { FcSalesPerformance, FcCancel } from "react-icons/fc";
import { IoMdChatboxes } from "react-icons/io";
import { TiWarning } from "react-icons/ti";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, useLocation } from 'react-router-dom';
import { GrFormEdit } from "react-icons/gr";
import useFetchItems from '../components/pickdatabase';
import axios from "axios";
import { Loading1, Error1, Not1 } from "../components/Loading";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

const Items = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const itemId = searchParams.get('item')
    const { items, loading, error } = useFetchItems();
    const [alternate, setAlternate] = useState(true);
    const [selectedValue, setSelectedValue] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rating, setRating] = useState(1);
    const loggedInUser = localStorage.getItem('loggedInUser');
    const [displayedComments, setDisplayedComments] = useState(4);
    const [comment, setComment] = useState('');
    const [ratingMerge, setRatingMerge] = useState(null)
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');
    const [comments, setComments] = useState([]);
    const [ghj, Sghj] = useState(null);
    let abc = 0;
    
    const fetchComments = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/comments/${itemId}`);
            setComments(response.data);
            let sum = 0;
            response.data.map((d1, index) => {
                sum += d1.rating;
                return null
            })
            let average = sum / response.data.length;

            await axios.put(`${SERVER_URL}/crating`, {
                itemId,
                ratingMerge : average
            });
            setRatingMerge(average)
            setRating(average)
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleReadMore = () => {
        setDisplayedComments(displayedComments + 5);
    };

    let count = 0;
    useEffect(() => {
        Sghj(Math.floor(Math.random() * 25001))
        fetchComments();
    }, []);
    useEffect(() => { }, [items]);


    if (loading) {
        return (<Loading1/>);
    }

    if (error) {
        return (<Error1/>);
    }

    if (!items[0]) {
        return (<Not1/>);
    }

    const handleComment = async (e) => {
        e.preventDefault();
        if (!loggedInUser) {
            setErrorMessage2('You need to log in to make comments!');
        }
        else {
            try {
                await axios.post(`${SERVER_URL}/comments`, {
                    loggedInUser,
                    itemId,
                    comment,
                    rating
                });
 
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
        setCurrentIndex((prevIndex) => {
            let newIndex = prevIndex === item.productImg.length - 1 ? 0 : prevIndex + 1;
            while (item.productImg[newIndex] === "" && newIndex !== prevIndex) {
                newIndex = newIndex === item.productImg.length - 1 ? 0 : newIndex + 1;
            }
            return newIndex;
        });
    };

    const prevSlide = (item) => {
        setCurrentIndex((prevIndex) => {
            let newIndex = prevIndex === 0 ? item.productImg.length - 1 : prevIndex - 1;
            while (item.productImg[newIndex] === "" && newIndex !== prevIndex) {
                newIndex = newIndex === 0 ? item.productImg.length - 1 : newIndex - 1;
            }
            return newIndex;
        });
    };


    const getDeliveryDate = (item) => {
        let myDate = new Date();
        myDate.setDate(myDate.getDate() + item.deliveryTime);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = myDate.toLocaleDateString('en-US', options);
        return formattedDate
    }

    const options = [];
    for (let i = 1; i <= 10; i++) {
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
                    setErrorMessage('Item already in cart');
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

    return (
        <div className="viewitems">
            {items.map((item, index) => {
                if (item.productId === itemId) {
                    count++;
                    return (
                        <div className='bk' key={index}>
                            <div className="grid-items">
                                <div className="slider">
                                    <button className="prev" onClick={() => prevSlide(item)}>
                                        &#10094;
                                    </button>
                                    <button className="next" onClick={() => nextSlide(item)}>
                                        &#10095;
                                    </button>
                                    {item.productImg && item.productImg.map((image, index) => (
                                        image !== "" && (
                                            <img key={index} alt={item.productName} className={index === currentIndex ? 'slide active2' : 'slide'} src={image} />
                                        )
                                    ))}
                                </div>
                                <div className="center-stage">
                                    <div className=""><h2 id={document.title = item.productName}>{item.productName}</h2></div>
                                    <div>
                                        <small>Brand: <Link to={`/search?query=${item.productBrand}`}>{item.productBrand || "None"}</Link> &nbsp;&nbsp;
                                            {loggedInUser === "admin" ? <Link to={`/edit?myid=${item.productId}`}><GrFormEdit style={{ color: "black" }} /></Link> : ""}</small> &nbsp;&nbsp;&nbsp;
                                    </div>
                                    <br />
                                    <div className="fg">
                                        <b>
                                            <div className="hidden">{abc = ratingMerge || item.productRatings}</div>
                                            {[...Array(Math.floor(abc))].map((_, index) => (
                                                <FaStar key={index} className='color-stars' />
                                            ))}
                                            {abc % 1 !== 0 && <FaStarHalfAlt key="half" className='color-stars' />}
                                            {[...Array(5 - Math.ceil(abc))].map((_, index) => (
                                                <FaRegStar key={index} className='color-stars' />
                                            ))} &nbsp;
                                            {abc ? parseFloat(abc).toFixed(1) : "0"} <br />
                                            
                                        </b>
                                        <span>
                                            <IoMdChatboxes /> {comments.length === 1 ? comments.length + " review" : comments.length + " reviews"}
                                        </span>
                                        <span>
                                            <FcSalesPerformance /> {ghj}  orders
                                        </span>
                                    </div>
                                    <div className="dfffa">{item.productAvailability ? <span style={{ color: "green" }}><FaCheck /> In Stock</span> : <span style={{ color: "red" }}><FcCancel />Unavailable</span>}</div>
                                    <h3>Description</h3>
                                    <div className="dfffa">
                                        <p>{item.productDescription} <br />
                                            {
                                                item.aboutItem && item.aboutItem !== item.productDescription ?
                                                    <span className="dfffa" dangerouslySetInnerHTML={{ __html: item.aboutItem }} /> : null
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="salesbox">
                                    <p className="myprice">
                                        {item.productPrice ? "₦" + item.productPrice.toLocaleString() : "Unavailable"}
                                        <i className="shadow">Price of item</i>
                                    </p>
                                    <p className="myprice">
                                        {item.shippingFee ? "₦" + item.shippingFee.toLocaleString() : "Free"}
                                        <i className="shadow">Shipping Fee</i>
                                    </p>
                                    <p className="counter">
                                        <span className="decrement" onClick={selectedValue > 1 ? () => setSelectedValue(selectedValue - 1) : null}>-</span>
                                        <span className="value">{selectedValue}</span>
                                        <span className="increment" onClick={() => setSelectedValue(selectedValue + 1)}>+</span>
                                    </p>
                                    <button className={`button ${alternate ? 'add-to-cart' : 'item-added'}`} onClick={alternate ? () => addContent() : () => removeContent()}>{alternate ? "Add to Cart" : "Item added"}</button>
                                    <br />
                                    <button className="button button-buy" onClick={handleBuyNowClick}>Buy Now</button>
                                    <br />
                                    <div className="purch-info">
                                        <p><TiWarning /> Sales taxes may apply at checkout</p>
                                        <p><TbTruckDelivery /> Expected delivery Date: {getDeliveryDate(item)}</p>
                                        <p><FaStarOfDavid /> Full warranty on all purchases</p>
                                        <p><FaLock /> Secure Payment</p>
                                    </div>
                                    <b className="small-b">{errorMessage}</b>
                                </div>
                            </div>
                            <div className="img-group-padd">
                                {
                                    (() => {
                                        if (item.itemImage && item.itemImage.length > 0) {
                                            let imageElements = [];
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
                            <section>
                                <div className="cmmt-section">
                                    <center><h2 className="comment-heading">Leave a comment</h2></center>
                                    <form className="comment-form" onSubmit={handleComment}>
                                        <textarea className="tx-ar"
                                            value={comment}
                                            maxLength={850}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Enter your comment...."
                                        ></textarea>
                                        <div className="rating-container">
                                            <span>Rate this item:</span>
                                            {[...Array(5)].map((_, index) => (
                                                <i key={index}
                                                    className={`rating-star ${index < rating ? 'active' : ''}`}
                                                    onClick={() => setRating(index + 1)}
                                                ><FaStar /></i>
                                            ))}
                                        </div>
                                        <button className="button" type="submit">Submit</button>
                                    </form>

                                    {errorMessage2 && <p className="errbad">{errorMessage2}</p>} <br /><br /><br />
                                    <div className="cmmt-section">
                                        {comments && comments.length > 0 ? (
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
                                                                        <b>
                                                                            {[...Array(Math.floor(comment.rating))].map((_, index) => (
                                                                                <FaStar key={index} className='color-stars' />
                                                                            ))}
                                                                            {comment.rating % 1 !== 0 && <FaStarHalfAlt key="half" className='color-stars' />}
                                                                            {[...Array(5 - Math.ceil(comment.rating))].map((_, index) => (
                                                                                <FaRegStar key={index} className='color-stars' />
                                                                            ))} &nbsp;
                                                                        </b>
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
                                            <div className="comment-section">
                                                <h2 className="comment-heading">No Reviews yet</h2>
                                                <p className="comment-description">Share your thoughts on this product. Your feedback is valuable!</p>
                                            </div>

                                        )}
                                    </div>
                                </div>
                            </section>
                            <Recomm />
                        </div>
                    )
                }
                else { return null;}
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
