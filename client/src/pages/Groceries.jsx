import React, { useState, useEffect } from 'react';
import Content from '../components/Content';
import useFetchItems from '../components/pickdatabase';
import cart from '../images/cart.jpg'
import con1 from '../images/con1.jpg'
import con2 from '../images/con2.jpg'
import con3 from '../images/con3.jpg'
import con8 from '../images/con8.jpg'
import { Loading1, Error1, Not1 } from '../components/Loading.jsx';

function GroceriesPage() {
    const { items, loading, error } = useFetchItems();
    const [sortedProducts1, setSortedProducts1] = useState([]);
    const [sortedProducts2, setSortedProducts2] = useState([]);
    const [sortedProducts3, setSortedProducts3] = useState([]);
    const [sortedProducts4, setSortedProducts4] = useState([]);
    const [sortedProducts5, setSortedProducts5] = useState([]);

    useEffect(() => {
        const filteredProducts1 = Object.values(items).flat().filter(item => item.productSubCategory === 'Drinks and alcohol');
        setSortedProducts1(filteredProducts1);

        const filteredProducts2 = Object.values(items).flat().filter(item => item.productSubCategory === 'Snacks and Junks');
        setSortedProducts2(filteredProducts2);

        const filteredProducts3 = Object.values(items).flat().filter(item => item.productSubCategory === 'Foodstuff');
        setSortedProducts3(filteredProducts3);

        const filteredProducts4 = Object.values(items).flat().filter(item => item.productSubCategory === 'Home utilities');
        setSortedProducts4(filteredProducts4);

        const filteredProducts5 = Object.values(items).flat().filter(item => item.productSubCategory === 'Fragrances');
        setSortedProducts5(filteredProducts5);

    }, [items]);

    if (loading) {
      return(<Loading1 />)
    }
  
    if (error) {
      return (<Error1/>);
    }
  
    if (!items[0]) {
      return (<Not1/>);
    }

    return (
        <div className='groceries-order'> 
            <h1 style={{marginLeft: "5rem"}}>Food, Home, Health and Beauty</h1>
            <section id="drinks-section">
                <div className='branch'>
                    <h4>Drinks, Wine & Liquor</h4>
                    <img className='lostfile' src={con1} alt="Drinks" />
                </div>
                <div className='showcaseheader'>
                    <div className='showcasecontainer'>
                        {sortedProducts1.slice(0, 12).map((item, index) => (
                            <div className='productCard' key={index}>
                                <Content item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="snacks-section">
                <div className='branch'>
                    <h4>Snacks and Junks</h4>
                    <img className='lostfile' src={con8} alt="Junks and items" />
                </div>
                <div className='showcaseheader'>
                    <div className='showcasecontainer'>
                        {sortedProducts2.slice(0, 12).map((item, index) => (
                            <div className='productCard' key={index}>
                                <Content item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="food-section">
                <div className='branch'>
                    <h4>Food Stuff</h4>
                    <img className='lostfile' src={cart} alt="Food" />
                </div>
                <div className='showcaseheader'>
                    <div className='showcasecontainer'>
                        {sortedProducts3.slice(0, 12).map((item, index) => (
                            <div className='productCard' key={index}>
                                <Content discount={true} item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="perfumes-section">
                <div className='branch'>
                    <h4>Fragrance</h4>
                    <img className='lostfile' src={con2} alt="Fragrances" />
                </div>
                <div className='showcaseheader'>
                        <div className='showcasecontainer'>
                            {sortedProducts5.slice(0, 12).map((item, index) => (
                                <div className='productCard' key={index}>
                                    <Content item={item} />
                                </div>
                            ))}
                        </div>
                    </div>
            </section>

            <section id="household-section">
                <div className='branch'>
                    <h4>Household care</h4>
                    <img className='lostfile' src={con3} alt="House care" />
                </div>
                <div className='showcaseheader'>
                    <div className='showcasecontainer'>
                        {sortedProducts4.slice(0, 12).map((item, index) => (
                            <div className='productCard' key={index}>
                                <Content discount={true} item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section>
                <div></div>
            </section>
        </div>
    );
}

export default GroceriesPage;
