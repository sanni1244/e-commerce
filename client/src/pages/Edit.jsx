import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
const loggedInUser = localStorage.getItem('loggedInUser');

const Edit = () => {
    document.title = "Edit"
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let myid = searchParams.get('myid')

    const [itemId, setItemId] = useState(myid || null);
    const [itemData, setItemData] = useState(null);
    const [message, setMessage] = useState({
        color: 'black',
        text: '',
    });


    const [formData, setFormData] = useState({
        productId: '',
        productCategory: '',
        productSubCategory: '',
        productName: '',
        productImg: [],
        productRatings: '',
        productBrand: '',
        productType: '',
        productPrice: '',
        productAvailability: '',
        productDescription: '',
        aboutItem: '',
        itemImage: [],
        shippingFee: '',
        deliveryTime: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'productImg' || name === 'itemImage') {
            const index = parseInt(e.target.dataset.index); 
            const newArray = [...(formData[name] || [])];
            newArray[index] = value; 
            setFormData({ ...formData, [name]: newArray });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        setMessage({
            text: "",
            color: "black"
        });
    };


    const handleSearch = async () => {
        setMessage({
            text: "Please wait while data is being retrieved",
            color: "black"
        })
        try {
            const response = await axios.get(`${SERVER_URL}/items/${itemId}`);
            setItemData(response.data);
            setFormData(response.data);
            setMessage({
                text: "Data fetched successfully",
                color: "green"
            })
        } catch (error) {
            console.error('Error fetching item:', error);
            setMessage({
                text: "Error retrieving data, check your product id or your internet connection and try again",
                color: "red"
            })
        }
    };

    const handleUpdate = async () => {
        setMessage({
            text: "Item is being updated",
            color: "black"
        })
        console.log(formData.productAvailability)
        if (
            Number(formData.productRatings) < 6 && Number(formData.productRatings) >= 0 &&
            formData.productName !== "" && formData.productName !== null &&
            (formData.productAvailability === "true" || formData.productAvailability === true || formData.productAvailability === false || formData.productAvailability === "True" || formData.productAvailability === "TRUE" || formData.productAvailability === "False" || formData.productAvailability === "FALSE" || formData.productAvailability === "false") &&
            formData.productCategory !== "" && formData.productCategory !== null &&
            formData.productSubCategory !== "" && formData.productSubCategory !== null) {
            try {
                await axios.put(`${SERVER_URL}/items/${itemId}`, formData);
                console.log('Item updated successfully');
                setMessage({
                    text: "Changes were successfully made",
                    color: "green"
                })
            } catch (error) {
                console.error('Error updating item:', error);
                setMessage({
                    text: "Failed to update",
                    color: "red"
                })
            }
        }
        else {
            setMessage({
                text: "Make sure fields are filled correctly",
                color: "red"
            })
        }
    };
    if (loggedInUser !== "admin") {
        window.location.href = "/";
    }
    else {
        console.log("")
    }

    return (
        <div className="edit-container">
            <div className="within">
                <h2 className="edit-heading">Edit Item</h2>
                <label className="input-label">
                    Enter Product ID:
                    <input className="input-field" type="text" value={itemId} onChange={(e) => setItemId(e.target.value)} />
                </label>
                <button onClick={handleSearch} className="search-button">Search</button>
                <p style={{ color: message.color }}>{message.text}</p>

                {itemData && (
                    <form>
                        <label className="input-label">
                            Product Category
                            <input type="text" className="input-field" name="productCategory" value={formData.productCategory} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Product Sub-Category
                            <input required type="text" className="input-field" name="productSubCategory" value={formData.productSubCategory} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Product Name
                            <input required type="text" id={document.title = 'Edit: ' + formData.productName} className="input-field" name="productName" value={formData.productName} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Product Image (URL) 1
                            <input type="url" className="input-field" name="productImg" data-index={0} value={formData.productImg && formData.productImg[0]} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Product Image (URL) 2
                            <input type="url" className="input-field" name="productImg" data-index={1} value={formData.productImg && formData.productImg[1]} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Product Image (URL) 3
                            <input type="url" className="input-field" name="productImg" data-index={2} value={formData.productImg && formData.productImg[2]} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Product Ratings
                            <input type="number" min={1} max={5} maxLength={1} className="input-field" name="productRatings" value={formData.productRatings} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Product Brand
                            <input type="text" className="input-field" name="productBrand" value={formData.productBrand} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Product Type
                            <input type="text" className="input-field" name="productType" value={formData.productType} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Product Price
                            <input type="number" className="input-field" name="productPrice" value={formData.productPrice} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Product Availability
                            <input type="text" className="input-field" placeholder='true or false' name="productAvailability" value={formData.productAvailability} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Product Description
                            <input type="text" className="input-field" name="productDescription" value={formData.productDescription} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            About Item
                            <textarea className="input-field text-field" name="aboutItem" value={formData.aboutItem} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Item Image (URL)
                            <input type="url" className="input-field" name="itemImage" data-index={0} value={formData.itemImage && formData.itemImage[0]} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Item Image (URL)
                            <input type="url" className="input-field" name="itemImage" data-index={1} value={formData.itemImage && formData.itemImage[1]} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Item Image (URL)
                            <input type="url" className="input-field" name="itemImage" data-index={2} value={formData.itemImage && formData.itemImage[2]} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Shipping Fee
                            <input type="number" className="input-field" name="shippingFee" value={formData.shippingFee} onChange={handleChange} />
                        </label>
                        <label className="input-label">
                            Delivery Time
                            <input type="number" className="input-field" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} />
                        </label>
                        <p className="message-text" style={{ color: message.color }}>{message.text}</p>
                        <br />
                        <button type="button" onClick={handleUpdate} className="update-button">Add Item</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Edit;
