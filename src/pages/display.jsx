import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
const loggedInUser = localStorage.getItem('loggedInUser');

const Display = () => {
    document.title = "Buyverse: Display";
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setMessage("Fetching data, please wait...");
            try {
                const response = await axios.get(`${SERVER_URL}/ito`);
                setItems(response.data);
                setSearchResults(response.data);
                setMessage("");
            } catch (error) {
                console.error('Error fetching items:', error);
                setMessage("Failed to fetch data, check your connection and refresh page");
            }
        };
        fetchData();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredResults = items.filter(item =>
            // item.productCategory === 'Creativity and Sports' &&
            // item.productCategory === 'Food, Home, Health and Beauty' &&
            // item.productCategory === 'Clothing and Accessories' &&
            // item.productCategory === 'Electronics and Gadgets' &&
            // item.productSubCategory !== 'Drinks and alcohol' &&
            // item.productSubCategory !== 'Snacks and Junks' &&
            // item.productSubCategory !== 'Foodstuff' &&
            // item.productSubCategory !== 'Home utilities' &&
            // item.productSubCategory !== 'Fragrances' &&
            // item.productSubCategory !== 'Tv, audio and entertainment' &&
            // item.productSubCategory !== 'Desktop & Tablets' &&
            // item.productSubCategory !== 'Electronic accessories' &&
            // item.productSubCategory !== 'Cell Phones' &&
            // item.productSubCategory !== 'Gaming and Peripherals' &&
            // item.productSubCategory !== 'Power and Generators' &&
            // item.productSubCategory !== 'Laptops' &&
            // item.productSubCategory !== "Children's Apparel" &&
            // item.productSubCategory !== "Women's Fashion" &&
            // item.productSubCategory !== "Fashion accessories" &&
            // item.productSubCategory !== 'Footwears' &&
            // item.productSubCategory !== "Men's Fashion" && 
            // item.productSubCategory !== 'Sport' &&
            // item.productSubCategory !== 'Hobbies' &&
            // item.productSubCategory !== 'Art' &&
            // item.productSubCategory !== 'Toys & Vehicles' &&
            (
                item.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.productCategory.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.productSubCategory.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

        setSearchResults(filteredResults);
    };
    if (loggedInUser !== "admin") {
        window.location.href = "/";
    }
    const handleUpdate = async (productId, updatedFields) => {
        try {
            const response = await axios.put(`${SERVER_URL}/itodd`, { productId, updatedFields });
            console.log(response.data); 
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className="edit-container">
            <div className="within">
                <h3 className="edit-heading">All Items</h3>
                <h4 style={{ color: "red" }}>{message}</h4>
                {items.length > 0 && (
                    <>
                        <form>
                            <label title='Cannot be left blank' className="input-label">
                                Product Id
                                <input
                                    type="text" className='input-field' placeholder="Search by product id, name or category"
                                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </label>
                            <button className='search-button' onClick={handleSearch}>Search</button>
                        </form>
                        <div className="diy">
                            {searchResults.map((item, index) => (
                                <div key={index} className="selfitem-container">
                                    {/* <h4>Item {index + 1}</h4> */}
                                    <div className="input-div">
                                        Product Category: &nbsp;
                                        <input
                                            type="text" value={item.productCategory}
                                            onChange={(e) => {
                                                const updatedValue = e.target.value;
                                                const updatedItem = { ...item, productCategory: updatedValue };
                                                const updatedResults = [...searchResults];
                                                updatedResults[index] = updatedItem;
                                                setSearchResults(updatedResults);
                                                handleUpdate(item.productId, { productCategory: updatedValue });
                                            }}
                                        />
                                    </div>
                                    <br />
                                    <div className="input-div">
                                        Product Sub-Category: &nbsp;
                                        <input
                                            type="text" value={item.productSubCategory}
                                            onChange={(e) => {
                                                const updatedValue = e.target.value;
                                                const updatedItem = { ...item, productSubCategory: updatedValue };
                                                const updatedResults = [...searchResults];
                                                updatedResults[index] = updatedItem;
                                                setSearchResults(updatedResults);
                                                handleUpdate(item.productId, { productSubCategory: updatedValue });
                                            }}
                                        />
                                    </div>
                                    <br />
                                    <div className="input-div">
                                        Product Name : &nbsp;
                                        <input
                                            type="text" value={item.productName}
                                            onChange={(e) => {
                                                const updatedValue = e.target.value;
                                                const updatedItem = { ...item, productName: updatedValue };
                                                const updatedResults = [...searchResults];
                                                updatedResults[index] = updatedItem;
                                                setSearchResults(updatedResults);
                                                handleUpdate(item.productId, { productName: updatedValue });
                                            }}
                                        />
                                    </div>
                                    <br />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Display;
