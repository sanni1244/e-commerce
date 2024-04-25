import React, { useState, useEffect } from 'react';
import Content from './Content';
import useFetchItems from './pickdatabase';

const Gaming = () => {
  const { items, loading, error } = useFetchItems();
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = Object.values(items).flat().filter(item => item.productSubCategory === 'Video Game Consoles & Accessories');
    const shuffledProducts = shuffle(filteredProducts);
    setSortedProducts(shuffledProducts);
  }, [items]);

  const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

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
  if (!items[0]) {
    return (
      <div className='error1'>
        <p>Empty cart</p>
      </div> 
    );
  }

  return (
    <div className='showcaseheader'>
      <div className='showcasecontainer'>
        {sortedProducts.slice(0, 8).map((item, index) => (
          <div className='productCard' key={index}>
            <Content item={item} discount={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gaming;
