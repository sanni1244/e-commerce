import { useLocation } from 'react-router-dom';
import useFetchItems from '../components/pickdatabase';
import Content from '../components/Content.jsx';
import { useEffect, useState } from 'react'; // Import useState
import '../styles/products.css';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function Products() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const cat = searchParams.get('cat');
    const subcat = searchParams.get('subcat');
    const { items, loading, error } = useFetchItems();
    const [shuffledItems, setShuffledItems] = useState([]);

    useEffect(() => {
        if (!loading && !error) {
            const filteredItems = items.filter(item => item.productCategory.toUpperCase() === cat.toUpperCase() && item.productSubCategory.toUpperCase() === subcat.toUpperCase());
            setShuffledItems(shuffleArray(filteredItems));
        }
    }, [items, cat, subcat, loading, error]);

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

    if (!shuffledItems.length) {
        return (
            <div className="item-not-found-container">
                <div className="item-not-found-content">
                    <h2>Category does not exist</h2>
                        <p>We couldn't find what you're looking for.</p>
                </div>
            </div>);
    }
    document.title = subcat;

    return (
        <div>
            <center><h2 className='mainh'>{cat + ": " + subcat}</h2></center>
            <div className='showcasecontainer'>
                {shuffledItems.map((item, index) => (
                    <div className='productCard shave' key={index}>
                        <Content item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;