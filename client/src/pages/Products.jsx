import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFetchItems from '../components/pickdatabase';
import Content from '../components/Content.jsx';
import { Loading1, Error1, Not1 } from '../components/Loading';


function Products() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const subcat = searchParams.get('subcat');
    const [subcat1, setSub] = useState(searchParams.get('subcat'));
    const { items, loading, error } = useFetchItems();
    const [shuffledItems, setShuffledItems] = useState([]);
    const [discount, setDiscount] = useState(false);
    const [discountVal, setDiscountVal] = useState(0);

    useEffect(() => {
        if (!loading && !error && subcat) {
            let filteredItems = [];

            if (subcat === "clothing") {
                filteredItems = items.filter(item =>
                    item.productSubCategory.toUpperCase() === "ALL" ||
                    item.productSubCategory.toUpperCase() === "WOMEN" ||
                    item.productSubCategory.toUpperCase() === "MEN"
                );
                setSub("Fashion")
                setDiscount(false)
            }
            else if (subcat === "laptop") {
                filteredItems = items.filter(item =>
                    item.productCategory.toUpperCase() === "COMPUTER"
                );
                setSub("Computer and Accessories")
                setDiscount(false)
            }
            else if (subcat === "phones") {
                filteredItems = items.filter(item =>
                    item.productSubCategory.toUpperCase() === "CELL PHONES"
                );
                setSub("Mobile phones")
                setDiscount(false)
            }
            else if (subcat === "electronics") {
                filteredItems = items.filter(item =>
                    item.productCategory.toUpperCase() === subcat.toUpperCase()
                );
                setSub("Electronic Devices")
                setDiscount(false)
            }
            else if (subcat === "video") {
                filteredItems = items.filter(item =>
                    item.productSubCategory.toLowerCase() === "video game consoles & accessories"
                );
                setDiscount(true)
                setSub("Video games and consoles")
                setDiscountVal(10)
            }
            else if (subcat === "drinks") {
                filteredItems = items.filter(item =>
                    item.productSubCategory.toLowerCase() === "drinks and alcohol"

                );
                setDiscount(true)
                setSub("Drinks and alcohol")
                setDiscountVal(6)
            }
            else {
                filteredItems = items.filter(item =>
                    item.productSubCategory.toUpperCase() === subcat.toUpperCase()
                );

            }

            filteredItems.sort((a, b) => b.productRatings - a.productRatings);
            setShuffledItems(filteredItems);
        }
    }, [items, subcat, loading, error]);
    document.title = subcat1 || "Products category";


    if (loading) {
        return (<Loading1/>);
    }

    if (error) {
        return (<Error1/>);
    }

    if (!items[0]) {
        return (<Not1/>);
    }

    if (!shuffledItems.length || subcat === null) {
        return (
            <div className="item-not-found-container">
                <div className="item-not-found-content">
                    <h2>Category does not exist</h2>
                    <p>We couldn't find what you're looking for.</p> <br />
                    <a href="/"><button className='button'>Go Home</button></a>
                </div>
            </div>);
    }


    return (
        <div>
            <center><h2>{subcat1.toUpperCase()}</h2></center> <br />
            <div className='showcasecontainer'>
                {shuffledItems.map((item, index) => (
                    <div className='productCard wider-container' key={index}>
                        <Content item={item} discount={discount} discountVal={discountVal} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;