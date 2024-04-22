import React, { useState } from 'react';
import axios from 'axios';
const loggedInUser = localStorage.getItem('loggedInUser');

const Delete = () => {
    document.title = "Delete"

    const [productId, setProductId] = useState('');
    const [message, setMessage] = useState({
        color: 'black',
        text: '',
    });
    const handleDelete = async () => {
        setMessage({
            text: 'Deleting item.......🔃🔃',
            color: 'red'
        });
        try {
            const response = await axios.delete(`http://localhost:4000/items/${productId}`);
            setMessage({
                text: 'Item has been deleted',
                color: 'red'
            });
            setMessage(response.data);
        } catch (error) {
            console.error('Error deleting item:', error);
            setMessage({
                text: 'Error deleting item: Data may have already been deleted',
                color: 'red'
            });
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
                <h2 className="edit-heading">Delete Item</h2>
            <label>
                Enter Product ID: <br /><br />
                <input className="input-field" type="text" placeholder='Z1111' value={productId} onChange={(e) => setProductId(e.target.value)} />
            </label> <br /> <br />
        <button onClick={handleDelete} className="search-button">Delete</button>
        <br /><br /><br /><br /><br /><br />
        <b style={{ color: message.color }}>{message.text}</b> 


        </div>
        </div>
    );
};

export default Delete;
