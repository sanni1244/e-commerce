import React, { useState } from 'react';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
const loggedInUser = localStorage.getItem('loggedInUser');

const Create = () => {
    document.title = "Buyverse: Create";


    const [formData, setFormData] = useState({
        productId: "",
        productCategory: "",
        productSubCategory: "",
        productName: "",
        productImg: ["", ""],
        productRatings: '',
        productBrand: '',
        productType: '',
        productPrice: 0,
        productAvailability: '',
        productDescription: '',
        aboutItem: '',
        itemImage: [],
        shippingFee: '',
        deliveryTime: ''
    });

    const [message, setMessage] = useState({
        color: 'black',
        text: '',
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

    const addItem = async () => {
        if (formData.productId !== "" && formData.productId !== null &&
            formData.productName !== "" && formData.productName !== null ) {
            setMessage({
                text: "Please wait: Adding item",
                color: "green"
            })
            try {
                const response = await axios.post(`${SERVER_URL}/items`, formData);
                console.log('Item added:', response.data);
                setMessage({
                    text: "Item added successfully",
                    color: "green"
                })
            } catch (error) {
                if (error.response.status === 401) {
                    setMessage({
                        text: "The product Id is already in use",
                        color: "red"
                    })
                }
                else {
                    console.error('Error adding item:', error);
                    setMessage({
                        text: "An error occured",
                        color: "red"
                    })}
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
                <h2 className="edit-heading">Create Item</h2>
                <p className="message-text" style={{ color: message.color }}>{message.text}</p>
                <form>
                    <label title='Cannot be left blank' className="input-label">
                        Product Id*
                        <input type="text" minLength={4} required className="input-field" name="productId" value={formData.productId} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        Product Category*
                        <input type="text" required className="input-field" name="productCategory" value={formData.productCategory} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        Product Sub-Category*
                        <input required type="text" className="input-field" name="productSubCategory" value={formData.productSubCategory} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        Product Name*
                        <input required type="text" className="input-field" name="productName" value={formData.productName} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        Product Image (URL) 1
                        <input type="url" className="input-field" name="productImg" data-index={0} value={formData.productImg && formData.productImg[0]} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        Product Image (URL) 2
                        <input type="url" className="input-field" name="productImg" data-index={1} value={formData.productImg && formData.productImg[1]} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        Product Image (URL) 3
                        <input type="url" className="input-field" name="productImg" data-index={2} value={formData.productImg && formData.productImg[2]} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        Product Ratings
                        <select className="input-field" name="productRatings" value={formData.productRatings} onChange={handleChange}>
                            <option value="">Select Rating</option>
                            {[1, 2, 3, 4, 5].map(rating => (
                                <option key={rating} value={rating}>{rating}</option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label className="input-label">
                        Product Brand
                        <input type="text" className="input-field" name="productBrand" value={formData.productBrand} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        Product Type
                        <input type="text" className="input-field" name="productType" value={formData.productType} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        Product Price
                        <input type="number" className="input-field" name="productPrice" value={formData.productPrice} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        Product Availability
                        <select className="input-field" name="productAvailability" value={formData.productAvailability} onChange={handleChange}>
                            <option value="">Select Availability</option>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </label>
                    <br />
                    <label className="input-label">
                        Product Description
                        <input type="text" className="input-field" name="productDescription" value={formData.productDescription} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        About Item
                        <textarea className="input-field text-field" name="aboutItem" value={formData.aboutItem} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        Item Image (URL)
                        <input type="url" className="input-field" name="itemImage" data-index={0} value={formData.itemImage && formData.itemImage[0]} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        Item Image (URL)
                        <input type="url" className="input-field" name="itemImage" data-index={1} value={formData.itemImage && formData.itemImage[1]} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        Item Image (URL)
                        <input type="url" className="input-field" name="itemImage" data-index={2} value={formData.itemImage && formData.itemImage[2]} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        Shipping Fee
                        <input type="number" className="input-field" name="shippingFee" value={formData.shippingFee} onChange={handleChange} />
                    </label>
                    <br />
                    <label className="input-label">
                        Delivery Time
                        <input type="number" className="input-field" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} />
                    </label>
                    <br />
                    <p className="message-text" style={{ color: message.color }}>{message.text}</p>
                    <button type="button" onClick={addItem} className="update-button">Add Item</button>

                </form>
            </div>
        </div>
    );
};

export default Create;
