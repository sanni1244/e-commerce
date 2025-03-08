import React, { useState, useEffect } from 'react';
import Content from './Content';
import { Error1, Loading1, Not1 } from './Loading';
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
