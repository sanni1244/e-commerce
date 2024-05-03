import React, { useState, useEffect } from 'react';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
const loggedInUser = localStorage.getItem('loggedInUser');

const Display = () => {
    document.title = "Display"
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
        e.preventDefault()
        const filteredResults = items.filter(item => {
            return (
                item.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.productCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.productSubCategory.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
        setSearchResults(filteredResults);
    };
    if (loggedInUser !== "admin") {
        window.location.href = "/";
    }
    
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
                                    <h4>Item {index + 1}</h4>
                                    <div className="input-div">
                                        Product id: &nbsp;
                                        <span>{item.productId} </span>
                                    </div>
                                    <br />
                                    <div className="input-div">
                                        Product Category: &nbsp;
                                        <span>{item.productCategory} </span>
                                    </div>
                                    <br />
                                    <div className="input-div">
                                        Product Sub-Category: &nbsp;
                                        <span>{item.productSubCategory} </span>
                                    </div>
                                    <br />
                                    <div className="input-div">
                                        Product Name : &nbsp;
                                        <span>{item.productName} </span>
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