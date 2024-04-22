import React, { useState, useEffect } from 'react';
import Content from './Content';
import useFetchItems from './pickdatabase';

const Price = () => {
  const { items, loading, error } = useFetchItems();
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    if (items) {
      const shuffledItems = shuffle(Object.values(items).flat());
      const sortedItems = shuffledItems.sort((a, b) => b.productPrice - a.productPrice);
      setSortedProducts(sortedItems);
    }
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

  return (
    <div className='showcaseheader'>
      <center><h2>Most Expensive Deals 💵💵</h2></center>
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

export default Price;
