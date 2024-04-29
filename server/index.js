const express = require('express');
const { client, dbName } = require('./connection');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json()); // Parse JSON bodies

app.post('/items', async (req, res) => {
    try {
        const {
            productId,
            productCategory,
            productSubCategory,
            productName,
            productImg,
            productRatings,
            productBrand,
            productType,
            productPrice,
            productAvailability,
            productDescription,
            aboutItem,
            itemImage,
            shippingFee,
            deliveryTime
        } = req.body;

        const parsedProductPrice = parseFloat(productPrice);
        const parsedShippingFee = parseFloat(shippingFee);
        const parsedDeliveryTime = parseInt(deliveryTime);
        const parsedProductAvailability = productAvailability === 'true';
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('items');

        const existingItem = await collection.findOne({ productId });
        if (existingItem) {
            return res.status(401).send('id already exists');
        }
        const newItem = {
            productId,
            productCategory,
            productSubCategory,
            productName,
            productImg,
            productRatings,
            productBrand,
            productType,
            productPrice: parsedProductPrice,
            productAvailability: parsedProductAvailability,
            productDescription,
            aboutItem,
            itemImage,
            shippingFee: parsedShippingFee,
            deliveryTime: parsedDeliveryTime
        };
        await collection.insertOne(newItem);
        res.status(200).send('Item added successfully');
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).send('Error adding item');
    } finally {
        await client.close();
    }
});
app.post('/paste', async (req, res) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('items');
    const updatedItems = await collection.find({}).toArray();

    res.status(201).json(updatedItems);

})
app.get('/items/:productId', async (req, res) => {
    try {
        const productId = req.params.productId.toUpperCase();
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('items');

        const item = await collection.findOne({
            productId: { $regex: new RegExp(productId, 'i') }
        });

        if (!item) {
            return res.status(404).send('Item not found');
        }
        res.status(200).json(item);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).send('Error fetching item');
    } finally {
        await client.close();
    }
});

app.get('/ito', async (req, res) => {
    try {

        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('items');

        const item = await collection.find().toArray();

        if (!item) {
            return res.status(404).send('No items found');
        }

        res.status(200).json(item);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).send('Error fetching item');
    } finally {
        await client.close();
    }
});

app.put('/items/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const myData = req.body;
        delete myData._id;
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('items');
        const parsedProductAvailability = myData.productAvailability === 'true';
        const parsedProductPrice = parseFloat(myData.productPrice);
        const parsedShippingFee = parseFloat(myData.shippingFee);
        const parsedDeliveryTime = parseInt(myData.deliveryTime);
        const parsedProductRatings = parseInt(myData.productRatings);

        await collection.updateOne({ productId }, {
            $set: {
                ...myData,
                productAvailability: true,
                productPrice: parsedProductPrice,
                shippingFee: parsedShippingFee,
                deliveryTime: parsedDeliveryTime,
                productRatings: parsedProductRatings
            }
        });

        res.status(200).send('Item updated successfully');
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send('Error updating item');
    } finally {
        await client.close();
    }
});

app.delete('/items/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;

        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('items');

        const result = await collection.deleteOne({ productId });

        if (result.deletedCount === 0) {
            return res.status(404).send('Item not found');
        }

        res.status(200).send('Item deleted successfully');
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Error deleting item');
    } finally {
        await client.close();
    }
});
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');
        const existingUser = await collection.findOne({ username });
        if (existingUser) {
            return res.status(401).json({ message: 'Username already exists' });
        }
        await collection.insertOne({ username, password: hashedPassword, cart: [], admin: false });
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');
        const user = await collection.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
});

app.get('/usercheck', async (req, res) => {
    try {
        const { username, password } = req.body;
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');
        const user = await collection.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
});

app.post('/cart/add', async (req, res) => {
    try {
        const { myusername, itemId, selectedValue } = req.body;
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');

        const user = await collection.findOne({ username: myusername });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const itemExists = user.cart.some(item => item.itemId === itemId);
        if (itemExists) {
            return res.status(400).json({ message: 'Item already added' });
        }

        await collection.updateOne(
            { username: myusername },
            { $push: { cart: { itemId, selectedValue } } }
        );

        return res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/cart/buy', async (req, res) => {
    try {
        const { myusername } = req.query; // Use req.query instead of req.body
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');

        const cart = await collection.findOne({ username: myusername });

        if (!cart) {
            return res.status(400).json({ message: 'User not found' });
        }

        return res.status(200).json(cart);
    } catch (error) {
        console.error('Something went wrong', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/user/update', async (req, res) => {
    try {
        const { curruser, username, fullname, gender, email, pass, address, country, state, phoneNumber } = req.body;
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');
        if (pass === null) {
            const result = await collection.updateOne(
                { username: curruser },
                { $set: { username, fullname, gender, email, address, country, state, phoneNumber } }
            );
            if (result.modifiedCount > 0) {
                return res.status(200).json({ message: 'User updated successfully' });
            } else {
                return res.status(400).json({ message: 'No changes were made' });
            }
        }
        const password = await bcrypt.hash(pass, 10);
        const result = await collection.updateOne(
            { username: curruser },
            { $set: { username, fullname, gender, email, password, address, country, state, phoneNumber } }
        );
        if (result.modifiedCount > 0) {
            return res.status(200).json({ message: 'User updated successfully' });
        } else {
            return res.status(400).json({ message: 'No changes were made' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/cart/remove', async (req, res) => {
    try {
        const { myusername } = req.body;
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');
        const user = await collection.findOne({ username: myusername });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await collection.updateOne(
            { username: myusername },
            { $pop: { cart: 1 } }
        );

        return res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

app.delete('/buy/remove', async (req, res) => {
    try {
        const { ind, username } = req.body;
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');

        const user = await collection.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart.splice(ind, 1); // Remove item at the specified index
        await collection.updateOne(
            { username: username },
            { $set: { cart: user.cart } }
        );

        return res.status(200).json({ message: 'Item removed successfully' });
    } catch (error) {
        console.error('Error removing item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



app.post('/comments', async (req, res) => {
    try {
        const { loggedInUser, itemId, comment, rating } = req.body;
        const createdAt = new Date(); // Get the current date and time

        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('comments');

        // Check if the user has already made a comment for this product
        const existingComment = await collection.findOne({ loggedInUser, itemId });
        if (existingComment) {
            return res.status(400).json({ message: 'You have already made a comment for this product' });
        }

        // Insert the new comment into the database collection
        await collection.insertOne({ loggedInUser, itemId, comment, createdAt, rating });

        return res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error('Error adding comment:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Backend code to handle comments

app.get('/comments/:itemId', async (req, res) => {
    try {
        const { itemId } = req.params;
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('comments');

        // Find all comments for the given productId
        const comments = await collection.find({ itemId }).toArray();

        return res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


app.put('/profile/info', async (req, res) => {
    try {
        const { myusername } = req.body;
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');
        const user = await collection.findOne({ username: myusername });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await collection.updateOne(
            { username: myusername },
            { $pop: { cart: 1 } }
        );

        return res.status(200).json({ message: '' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})
app.post('/purchase/add', async (req, res) => {
    try {
        const { mysent, loggedInUser } = req.body;
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');

        const user = await collection.findOne({ username: loggedInUser });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        for (let i = 0; i < mysent.length; i++) {
            const item = mysent[i]; // Accessing mysent[i] to get each item
            const { itemId, price, quantity, purchaseId, status } = item;
            await collection.updateOne(
                { username: loggedInUser }, // Change mysent to loggedInUser
                {
                    $push: {
                        purchases: {
                            itemId: itemId,
                            price: price,
                            quantity: quantity,
                            purchaseId: purchaseId,
                            status: status,
                            date: new Date()
                        }
                    }
                }
            );
        }

        return res.status(200).json({ message: 'Items added to purchases successfully' });
    } catch (error) {
        console.error('Error adding items to purchases:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/order/history/:username', async (req, res) => {
    try {
        const username = req.params.username;
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');

        const user = await collection.findOne({ username });

        if (!user || !user.purchases || user.purchases.length === 0) {
            return res.status(404).json({ message: 'Order history not found' });
        }
        const sortedOrders = user.purchases.sort((a, b) => new Date(b.date) - new Date(a.date));
        res.status(200).json({ orders: sortedOrders });
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        client.close();
    }
});



app.get('/comments', async (req, res, next) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('comments');
        const comments = await collection.find().toArray();
        res.json(comments);
    } catch (error) {
        next(error);
    }
});
app.delete('/comments/:id', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('comments');
        const { id } = req.params;
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Comment not found' });
        } else {
            res.json({ message: 'Comment deleted successfully' });
        }
    } catch (error) {
        console.error('Error fetching:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/crating', async (req, res) => {
    try {
        const { itemId, ratingMerge } = req.body;
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('items');
        const existingItem = await collection.findOne({ productId: itemId });
        if (!existingItem) {
            return res.status(404).send('Item not found');
        }
        await collection.updateOne(
            { productId: itemId },
            { $set: { productRatings: ratingMerge } }
        );
        res.status(200).send('Product ratings updated successfully');
    } catch (error) {
        console.error('Error updating product ratings:', error);
        res.status(500).send('Error updating product ratings');
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


