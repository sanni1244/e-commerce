import React, { useState } from 'react';
import axios from 'axios';
const loggedInUser = localStorage.getItem('loggedInUser');
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

const Delete = () => {
    document.title = "Buyverse: Delete";

    const [productId, setProductId] = useState('');
    const [message, setMessage] = useState({
        color: 'black',
        text: '',
    });
    const handleDelete = async (e) => {
        e.preventDefault()
        setMessage({
            text: 'Deleting item...🔃🔃',
            color: 'red'
        });
        try {
            await axios.delete(`${SERVER_URL}/items/${productId}`);
            setMessage({
                text: 'Item has been deleted',
                color: 'green'
            });

        } catch (error) {
            if (error.response.data === "Item not found") {
                setMessage({
                    text: 'Item not found!',
                    color: 'red'
                });
            }
            else {
                setMessage({
                    text: 'An error occured!!',
                    color: 'red'
                });
            }
        }
    };
    if (loggedInUser !== "admin") {
        window.location.href = "/";
    }

    return (
        <div className="edit-container">
            <div className="within">
                <h2 className="edit-heading">Delete Item</h2>
                <form>
                    <label className="input-label">
                        Enter Product ID: 
                        <input className="input-field" type="text" placeholder='iphone-pro-max' value={productId} onChange={(e) => setProductId(e.target.value)} />
                    </label>
                    <button onClick={handleDelete} className="search-button">Delete</button>
                </form>
                <br /><br /><br />
                <b style={{ color: message.color }}>{message.text}</b>
            </div>
        </div>
    );
};

export default Delete;
