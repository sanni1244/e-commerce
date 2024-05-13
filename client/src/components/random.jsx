import React, { useState, useEffect } from 'react';
import Content from './Content';
import { Error1, Loading1, Not1 } from './Loading';
import useFetchItems from './pickdatabase';

const Random = ({ gold }) => {
    const { items, loading, error } = useFetchItems();
    const [sortedRandom, setRandom] = useState([]);
    const [sortChildren, setChildren] = useState([]);
    const [sortedClothes, setClothes] = useState([]);
    const [sortedApple, setApple] = useState([]);
    const [sortedGame, setGame] = useState([]);
    const [sortedhighprice, sethighprice] = useState([]);
    const [sortedLaptop, setLaptop] = useState([]);







    useEffect(() => {
        const random = shuffleArray(Object.values(items).flat());
        setRandom(random);

        const clothes = Object.values(items).flat().filter(item => item.productCategory === "Clothing and Accessories");
        setClothes(shuffleArray(clothes));

        const Children = Object.values(items).flat().filter(item => item.productSubCategory === 'Children\'s Apparel' || item.productSubCategory === 'Toys & Vehicles');
        setChildren(shuffleArray(Children));

        const apple = Object.values(items).flat().filter(item => item.productBrand === 'Apple');
        setApple(shuffleArray(apple));

        const gaming = Object.values(items).flat().filter(item => item.productSubCategory === 'Gaming and Peripherals');
        setGame(shuffleArray(gaming));

        const shuffledItems11 = shuffleArray(items);
        const highprice = shuffledItems11.sort((a, b) => b.productRatings - a.productRatings);
        sethighprice(highprice);

        const Laptop = shuffleArray(Object.values(items).flat().filter(item => item.productType === 'Laptop' || item.productSubCategory.toLowerCase() === 'cell phones'));
        setLaptop(Laptop);

    }, [items]);


    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    if (loading) {
        return (<Loading1 />);
    }

    if (error) {
        return (<Error1 />);
    }
    if (!items[0]) {
        return (<Not1 />);
    }

    const showcaseData = {
        clothes: sortedClothes,
        children: sortChildren,
        random: sortedRandom,
        apple: sortedApple,
        gaming: sortedGame,
        price: sortedhighprice,
        laptop: sortedLaptop
    };

    return (
        <div className='showcasecontainer'>
            {showcaseData[gold].slice(0, 12).map((item, index) => (
                <div className='productCard' key={index}>
                    <Content item={item} />
                </div>
            ))}
        </div>
    );
};

export default Random;
