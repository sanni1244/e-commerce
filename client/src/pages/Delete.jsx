import React, { useState } from 'react';
import axios from 'axios';
const loggedInUser = localStorage.getItem('loggedInUser');
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

const Delete = () => {
    document.title = "Delete"

    const [productId, setProductId] = useState('');
    const [message, setMessage] = useState({
        color: 'black',
        text: '',
    });
    const handleDelete = async (e) => {
        e.preventDefault()
        setMessage({
            text: 'Deleting item.......🔃🔃',
            color: 'red'
        });
        try {
            await axios.delete(`${SERVER_URL}/items/${productId}`);
            setMessage({
                text: 'Item has been deleted',
                color: 'green'
            });

        } catch (error) {
            if(error.response.data === "Item not found"){
                setMessage({
                    text: 'Item not found!',
                    color: 'red'
                });
            }
            else{
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
                <label>
                    Enter Product ID: <br /><br />
                    <input className="input-field" type="text" placeholder='Z1111' value={productId} onChange={(e) => setProductId(e.target.value)} />
                </label> <br /> <br />
                <button onClick={handleDelete} className="search-button">Delete</button>
                <br /><br /><br /><br />
                <b style={{ color: message.color }}>{message.text}</b>


            </div>
        </div>
    );
};

export default Delete;
