import React, { useState, useEffect } from 'react';
import Content from './Content';
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
        return (
          <div className='load'>
            <p>Loading...</p>
          </div>
        );
      }
    
      if (error) {
        return (
          <div className='error1'>
            <p>Error occured</p>
          </div>
        );
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
