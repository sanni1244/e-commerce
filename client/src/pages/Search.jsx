import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Content from '../components/Content.jsx';
import useFetchItems from '../components/pickdatabase';

const SearchPage = () => {
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
          <h5>"Ever noticed how online shopping turns 'just browsing' into a full-blown retail adventure? It's like stumbling into Narnia, but instead of lions and witches, it's all about deals and wishlists!"</h5>
        </div>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
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
              <div className='productCard' key={index}>
                <Content item={item} />
              </div>
            ))}
          </div>
        </div>}
    </>
  );
};

export default SearchPage;
