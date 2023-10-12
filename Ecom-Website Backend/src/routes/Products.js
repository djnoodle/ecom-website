const express = require('express') // Importera express-modulen
const router = express.Router() // Skapa en ny router-instans från express-modulen.

router.get('/api/products', async (req, res) => {
    const client = await MongoClient.connect(
      'mongodb://localhost:27017',
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
    const db = client.db('vue-db');
    const products = await db.collection('products').find({}).toArray();
    res.status(200).json(products);
    client.close();
  });
  
  router.get('/api/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const client = await MongoClient.connect(
      'mongodb://localhost:27017',
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
    const db = client.db('vue-db');
    const product = await db.collection('products').findOne({ id: productId });
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json('Could not find the product!');
    }
    client.close();
});

module.exports = router
