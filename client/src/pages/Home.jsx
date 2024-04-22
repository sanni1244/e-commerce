import React from 'react';
import Categories from '../components/Categories';
import LoadPage from '../components/hero';
import '../styles/home.css'

const Home = () => {
    document.title = "Rizz Store"
    return (
        <div className="App">
            <div className='grid-option'>
                <Categories />
                <LoadPage />
            </div>
        </div>
    )
}

export default Home
