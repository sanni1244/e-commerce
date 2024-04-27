import React, { useState, useEffect } from 'react';
import Content from '../components/Content';
import useFetchItems from '../components/pickdatabase';
import cart from '../images/cart.jpg'
import con1 from '../images/con1.jpg'
import con2 from '../images/con2.jpg'
import con3 from '../images/con3.jpg'
import con8 from '../images/con8.jpg'



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

        const filteredProducts4 = Object.values(items).flat().filter(item => item.productSubCategory === 'Household care');
        setSortedProducts4(filteredProducts4);

        const filteredProducts5 = Object.values(items).flat().filter(item => item.productSubCategory === 'Fragrances');
        setSortedProducts5(filteredProducts5);

        // const filteredProducts1 = Object.values(items).flat().filter(item => item.productSubCategory === 'Drinks and alcohol');
        // setSortedProducts1(filteredProducts1);

    }, [items]);


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
        <div className='groceries-order'>
            <center><h1>Groceries</h1></center>

            <section id="drinks-section">
                <div className='branch'>
                    <h2>Drinks, Wine & Liquor</h2>
                    <img className='lostfile' src={con1} alt="cart image" />
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
                    <h2>Snacks and Junks</h2>
                    <img className='lostfile' src={con8} alt="cart image" />
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
                    <h2>Food Stuff</h2>
                    <img className='lostfile' src={cart} alt="cart image" />
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
                    <h2>Fragrance</h2>
                    <img className='lostfile' src={con2} alt="cart image" />
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
                    <h2>Household care</h2>
                    <img className='lostfile' src={con3} alt="cart image" />
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
