import React from 'react';
import Price from './Price';
import Laptop from './laptopdeals';
import Clothes from './Clothes';
import Ratings from './highratings';
import Random from './random';
import Apple from './Appledeals';
import useFetchItems from './pickdatabase';
import { useEffect } from 'react';
import { Error1, Loading1, Not1 } from './Loading';

const Hero = () => {
  const { items, loading, error } = useFetchItems();

  useEffect(() => {
  }, [items]);

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
    <div>
      {items && items.length > 0 && (
        <>
          <Ratings s={items} />
          <div className='beautiful-space'></div>
          <Price s={items} />
          <div className='beautiful-space'></div>
          <Laptop s={items} />
          <div className='beautiful-space'></div>
          <Clothes s={items} />
          <div className='beautiful-space'></div>
          <Random s={items} />
          <div className='beautiful-space'></div>
          <Apple s={items} />
        </>
      )}
    </div>
  );
}

export default Hero;
