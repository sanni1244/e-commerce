import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Content from '../components/Content.jsx';
import { Loading1, Error1, Not1 } from '../components/Loading.jsx';
import useFetchItems from '../components/pickdatabase';

const SearchPage = () => {
  document.title = "Buyverse: Search Products";
  const { items, loading, error } = useFetchItems();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearchQuery = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  const filteredProducts = Object.values(items)
    .flat()
    .filter(product =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productSubCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productBrand.toLowerCase().includes(searchQuery.toLowerCase())


    );

  if (loading) {
    return(<Loading1 />)
  }

  if (error) {
    return (<Error1/>);
  }

  if (!items[0]) {
    return (<Not1/>);
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='searching'>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        className="searchbar"
        onChange={handleSearchChange}
      />
      {searchQuery === "" ?
        <div className="search-prompt-container">
          <div className="search-prompt-content">
            <h2>Welcome to Rizz Store!</h2>
            <p>Discover amazing products by entering a search query.</p>
            <p className="tip">Pro Tip: Try searching for categories, brands, or product names.</p>
          </div>
        </div>

        :
        <div>
          <center><h2>{searchQuery.toUpperCase()}</h2></center>
          <div className='showcasecontainer'>
            {filteredProducts.map((item, index) => (
              <div className='productCard wider-container' key={index}>
                <Content item={item} />
              </div>
            ))}
          </div>
        </div>}
    </div>
  );
};

export default SearchPage;
