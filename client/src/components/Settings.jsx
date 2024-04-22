import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [language, setLanguage] = useState('en');
    const [currency, setCurrency] = useState('USD');
    const [wishlistDisplay, setWishlistDisplay] = useState(true);
    const [orderHistoryLimit, setOrderHistoryLimit] = useState(10);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState({
        newProducts: true,
        abandonedCart: true,
        orderConfirmation: true,
    });
    const [themeC, setMytheme] = useState(localStorage.getItem('themeColor') || "#000000")
    document.documentElement.style.setProperty('--primary_color', themeC);
  


    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
      };
    
      const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
      };
      const handleThemeChange = (e) => {
        document.documentElement.style.setProperty('--primary_color', e.target.value);
        localStorage.setItem('themeColor', e.target.value)
        setMytheme(e.target.value)
      }
    
      const toggleWishlistDisplay = () => {
        setWishlistDisplay(!wishlistDisplay);
      };
    
    
      const handleOrderHistoryChange = (event) => {
        setOrderHistoryLimit(event.target.value);
      };
    
      const toggleTwoFactorAuth = () => {
        setTwoFactorAuth(!twoFactorAuth);
      };
    
      const handleEmailNotificationToggle = (type) => {
        setEmailNotifications({
          ...emailNotifications,
          [type]: !emailNotifications[type],
        });
      };

    return (
        <div>
            <div className="settings class-header">
                <form>
                    <h3>Preferences</h3>
                    <div className="setting-option">
                        <label htmlFor="language">Language:</label>
                        <select className='fddd-select' value={language} onChange={handleLanguageChange}>
                            <option value="en">English</option>
                            <option value="fr">French</option>
                            <option value="es">Spanish</option>
                        </select>
                    </div>
                    <div className="setting-option">
                        <label htmlFor="currency">Currency:</label>
                        <select className='fddd-select' value={currency} onChange={handleCurrencyChange}>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="NGN">NGN (₦)</option>
                        </select>
                    </div>
                    <div className="setting-option">
                        <label htmlFor="language">Text Theme:</label>
                        <select className='fddd-select' onChange={handleThemeChange}>
                            <option selected={themeC === "#000000"} value="#000000">Classic Black</option>
                            <option selected={themeC === "#4169E1"} value="#4169E1">Royal Blue</option>
                            <option selected={themeC === "#DC143C"} value="#DC143C">Crimson Red</option>
                            <option selected={themeC === "#228B22"} value="#228B22">Forest Green</option>
                            <option selected={themeC === "#FFD700"} value="#FFD700">Sunny Yellow</option>
                            <option selected={themeC === "#9370DB"} value="#9370DB">Lavender Purple</option>
                            <option selected={themeC === "#008080"} value="#008080">Ocean Teal</option>
                            <option selected={themeC === "#FFA07A"} value="#FFA07A">Light Salmon</option>
                            <option selected={themeC === "#800080"} value="#800080">Purple</option>
                            <option selected={themeC === "#FF6347"} value="#FF6347">Tomato</option>
                            <option selected={themeC === "#00FF7F"} value="#00FF7F">Spring Green</option>
                            <option selected={themeC === "#FF69B4"} value="#FF69B4">Hot Pink</option>
                            <option selected={themeC === "#00FFFF"} value="#00FFFF">Cyan</option>
                            <option selected={themeC === "#FFDAB9"} value="#FFDAB9">Peachpuff</option>
                            <option selected={themeC === "#DAA520"} value="#DAA520">Goldenrod</option>
                            <option selected={themeC === "#B0E0E6"} value="#B0E0E6">Powder Blue</option>
                            <option selected={themeC === "#6A5ACD"} value="#6A5ACD">Slate Blue</option>
                            <option selected={themeC === "#ADFF2F"} value="#ADFF2F">Green Yellow</option>
                            <option selected={themeC === "#FF1493"} value="#FF1493">Deep Pink</option>
                            <option selected={themeC === "#32CD32"} value="#32CD32">Lime Green</option>
                            <option selected={themeC === "#FFFF00"} value="#FFFF00">Yellow</option>
                            <option selected={themeC === "#8A2BE2"} value="#8A2BE2">Blue Violet</option>
                            <option selected={themeC === "#F08080"} value="#F08080">Light Coral</option>
                            <option selected={themeC === "#00CED1"} value="#00CED1">Dark Turquoise</option>
                            <option selected={themeC === "#FF4500"} value="#FF4500">Orange Red</option>
                            <option selected={themeC === "#9370DB"} value="#9370DB">Medium Purple</option>
                            <option selected={themeC === "#20B2AA"} value="#20B2AA">Light Sea Green</option>
                            <option selected={themeC === "#FF8C00"} value="#FF8C00">Dark Orange</option>
                            <option selected={themeC === "#9932CC"} value="#9932CC">Dark Orchid</option>
                            <option selected={themeC === "#8B0000"} value="#8B0000">Dark Red</option>
                            <option selected={themeC === "#4682B4"} value="#4682B4">Steel Blue</option>
                            <option selected={themeC === "#556B2F"} value="#556B2F">Dark Olive Green</option>
                            <option selected={themeC === "#191970"} value="#191970">Midnight Blue</option>
                            <option selected={themeC === "#696969"} value="#696969">Dim Gray</option>
                            <option selected={themeC === "#556B2F"} value="#556B2F">Olive Drab</option>
                            <option selected={themeC === "#483D8B"} value="#483D8B">Dark Slate Blue</option>
                            <option selected={themeC === "#8B4513"} value="#8B4513">Saddle Brown</option>
                            <option selected={themeC === "#006400"} value="#006400">Dark Green</option>
                            <option selected={themeC === "#2F4F4F"} value="#2F4F4F">Dark Slate Gray</option>
                            <option selected={themeC === "#9932CC"} value="#9932CC">Dark Orchid</option>
                            <option selected={themeC === "#556B2F"} value="#556B2F">Olive Drab</option>
                            <option selected={themeC === "#483D8B"} value="#483D8B">Dark Slate Blue</option>
                            <option selected={themeC === "#FF7F50"} value="#FF7F50">Coral</option>
                            <option selected={themeC === "#00FFFF"} value="#00FFFF">Aqua</option>
                            <option selected={themeC === "#20B2AA"} value="#20B2AA">Light Sea Green</option>
                            <option selected={themeC === "#FFFF00"} value="#FFFF00">Electric Yellow</option>
                            <option selected={themeC === "#8A2BE2"} value="#8A2BE2">Blue Violet</option>
                            <option selected={themeC === "#F08080"} value="#F08080">Salmon Pink</option>
                            <option selected={themeC === "#00CED1"} value="#00CED1">Dark Cyan</option>
                            <option selected={themeC === "#9370DB"} value="#9370DB">Medium Orchid</option>
                            <option selected={themeC === "#FFA07A"} value="#FFA07A">Light Salmon</option>
                            <option selected={themeC === "#800080"} value="#800080">Rich Purple</option>
                            <option selected={themeC === "#FF6347"} value="#FF6347">Reddish Orange</option>
                            <option selected={themeC === "#228B22"} value="#228B22">Jungle Green</option>
                            <option selected={themeC === "#9932CC"} value="#9932CC">Dark Violet</option>
                            <option selected={themeC === "#8B0000"} value="#8B0000">Maroon</option>
                            <option selected={themeC === "#556B2F"} value="#556B2F">Army Green</option>
                            <option selected={themeC === "#483D8B"} value="#483D8B">Indigo</option>
                        </select>
                    </div>
                    <h3>Wishlist</h3>
                    <div className="setting-option">
                        <label htmlFor="showWishlist">Show Wishlist on Profile:</label>
                        <input
                            type="checkbox"
                            id="showWishlist"
                            checked={wishlistDisplay}
                            onChange={toggleWishlistDisplay}
                        />
                    </div>
                    <h3>Order History</h3>
                    <div className="setting-option">
                        <label htmlFor="orderHistoryLimit">Number of Orders to Display:</label>
                        <input
                            type="number"
                            id="orderHistoryLimit"
                            value={orderHistoryLimit}
                            min="5"
                            max="25"
                            onChange={handleOrderHistoryChange}
                        />
                    </div>
                    <h3>Security</h3>
                    <div className="setting-option">
                        <label htmlFor="twoFactorAuth">Enable Two-Factor Authentication:</label>
                        <input
                            type="checkbox"
                            id="twoFactorAuth"
                            checked={twoFactorAuth}
                            onChange={toggleTwoFactorAuth}
                        />
                    </div>
                    <h3>Email Notifications</h3>
                    <div className="setting-option">
                        <label htmlFor="newProducts">New Products:</label>
                        <input
                            type="checkbox"
                            id="newProducts"
                            checked={emailNotifications.newProducts}
                            onChange={() => handleEmailNotificationToggle('newProducts')}
                        />
                    </div>
                    <div className="setting-option">
                        <label htmlFor="abandonedCart">Abandoned Cart Reminder:</label>
                        <input
                            type="checkbox"
                            id="abandonedCart"
                            checked={emailNotifications.abandonedCart}
                            onChange={() => handleEmailNotificationToggle('abandonedCart')}
                        />
                    </div>
                    <div className="setting-option">
                        <label htmlFor="orderConfirmation">Order Confirmation:</label>
                        <input
                            type="checkbox"
                            id="orderConfirmation"
                            checked={emailNotifications.orderConfirmation}
                            onChange={() => handleEmailNotificationToggle('orderConfirmation')}
                        />
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Settings
