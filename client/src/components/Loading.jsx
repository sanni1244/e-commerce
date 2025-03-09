// renderHelpers.js
import React from 'react';

const quotes = [
    "Ever noticed how online shopping turns 'just browsing' into a full-blown retail adventure? It's like stumbling into Narnia, but instead of lions and witches, it's all about deals and wishlists!",
    "Shopping online is like having the entire mall to yourself, except you don't have to put on pants.",
    "Retail therapy is the best therapy. Thank goodness for online shopping!",
    "Shopping is my cardio. Thank you, online stores, for keeping me fit!",
    "Life is short, buy the shoes... online, of course!",
    "Online shopping: because it's frowned upon to be in a store with no bra, sweatpants, and a glass of wine.",
    "I can resist anything except temptation... to shop online!",
    "My favorite outdoor activity is online shopping.",
    "You can't buy happiness, but you can buy stuff online, and that's kind of the same thing.",
    "Online shopping: the only time where your shopping cart is not judged.",
];

const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
};

export const Loading1 = () => (
    <div className="loading-container">
        <div className="loading-content">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
        </div>
    </div>
);

export const Error1 = (error) => (
    <div className="error-container"> 
        <div className="error-content">
            <h2>Oops! Something went wrong.</h2>
            <b>{error.code === "ERR_NETWORK" ? error.message : "Error while fetching data "}: Try again</b>
        </div>
    </div>
);

export const Not1 = () => (
    <div className="not-found-container">
        <div className="not-found-content">
            <h5>{getRandomQuote()}</h5>
        </div>
        <div className="loading-spinner"></div>
    </div>
);
