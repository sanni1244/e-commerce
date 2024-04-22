import React from 'react';
import Price from './Price';
import Laptop from './laptopdeals';
import Appliances from './Appliances';
import Ratings from './highratings';
import Random from './random';
import Apple from './Appledeals';
import useFetchItems from './pickdatabase';
import { useEffect } from 'react';

const Hero = () => {
  const { items, loading, error } = useFetchItems();

  useEffect(() => {
  }, [items]);

  if (loading) {
    return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        </div>
    );
}

if (error) {
    return (
        <div className="error-container">
            <div className="error-content">
                <h2>Oops! Something went wrong.</h2>
                <b>{error.code === "ERR_NETWORK" ? error.message : "Error while fetching data "}: Try again</b>
            </div>
        </div>
    );
}

if (!items[0]) {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h5>
                    "Shopping online is like being in a candy store, except the candy is virtual, and your wallet is the one crying out for mercy!"
                </h5>
            </div>
            <div className="loading-spinner"></div>
        </div>
    );
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
          <Appliances s={items} />
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
