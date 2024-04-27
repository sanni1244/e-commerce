import React, { useState } from 'react';
import { Cat1 } from "../resources/categories";
import { Link } from 'react-router-dom';

const Categories = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleSubcategories = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className='CategoryContainer'>
            <div className='ffs'>
                {Cat1.map((category, index) => (
                    <div key={category.id} className={`category ${activeIndex === index ? 'active' : ''}`}>
                        <h3 onClick={() => toggleSubcategories(index)}>{category.Department}</h3>
                        <ul className={`sub-menu ${activeIndex === index ? 'active' : ''}`}>
                            {category.SubCategories.map((subCategory, subIndex) => (
                                <Link to={`/products?cat=${encodeURIComponent(category.Department)}&subcat=${encodeURIComponent(subCategory)}`}>
                                    <li className='sublinkclass' key={subIndex}>
                                        {subCategory}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        //     <div className='CategoryContainer'>
        //     <div className='ffs'>
        //         {Cat1.map((category, index) => (
        //             <div key={category.id} className={`category ${activeIndex === index ? 'active' : ''}`}>
        //                 <h3 onClick={() => toggleSubcategories(index)}>{category.Department}</h3>
        //                 <ul className={`sub-menu ${activeIndex === index ? 'active' : ''}`}>
        //                     {category.SubCategories.map((subCategory, subIndex) => (
        //                         <li className='sublinkclass' key={subIndex}>
        //                             <Link to={`/products?cat=${encodeURIComponent(category.Department)}&subcat=${encodeURIComponent(subCategory)}`}>{subCategory}</Link>
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>
        //     ))}
        //         </div>
        // </div>
    );
};

export default Categories;
