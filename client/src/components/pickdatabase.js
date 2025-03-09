import { useState, useEffect } from 'react';
import axios from 'axios';
const loggedInUser = localStorage.getItem('loggedInUser');

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

const useFetchItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUserDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${SERVER_URL}/paste`);
                setItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching items:', error);
                setError(error);
                setLoading(false);
            }
        };
        
        const getUser = async () => {
            if(loggedInUser){
                try { 
                    const response = await axios.get(`${SERVER_URL}/cart/buy?myusername=${loggedInUser}`);
                    setUserDetails(response.data);
                    setLoading(false);
                }
                catch (error) {
                    console.log(error)
                    setError(error);
                    setLoading(false);
                }
            }
        }
        getUser()

        fetchData();
    }, []);

    return { items, loading, error, user };
};

export default useFetchItems;
