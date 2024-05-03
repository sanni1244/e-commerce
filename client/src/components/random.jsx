import React, { useState, useEffect } from 'react';
import Content from './Content';
import { Error1, Loading1, Not1 } from './Loading';
import useFetchItems from './pickdatabase';

const Random = () => {
    const { items, loading, error } = useFetchItems();
    const [sortedProducts, setsortedProducts] = useState([]);

    useEffect(() => {
        const shuffledProducts = shuffleArray(Object.values(items).flat());
        const selectedProducts = shuffledProducts.slice(0, 20); // Select first 20 random products
        setsortedProducts(selectedProducts);
    }, [items]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    if (loading) {
      return (<Loading1/>);
    }
  
    if (error) {
      return (<Error1/>);
    }
    if (!items[0]) {
      return (<Not1/>);
    }

    return (
        <div className='showcaseheader'>

            <center><h2>Random Collection 💻💻</h2></center>

            <div className='showcasecontainer'>
                {sortedProducts.slice(0, 12).map((item, index) => (
                    <div className='productCard' key={index}>
                        <Content item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Random;
