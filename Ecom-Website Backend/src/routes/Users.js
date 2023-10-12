const express = require('express') // Importera express-modulen
const router = express.Router() // Skapa en ny router-instans från express-modulen.
const dotenv = require('dotenv') // Importerar dotenv-paketet som används för att läsa miljövariabler från en .env-fil.
import { MongoClient } from 'mongodb'

router.get('/api/users/:userId/cart', async (req, res) => {
    const { userId } = req.params
    const client = await MongoClient.connect(`${process.env.DB_URL}`)
    const db = client.db('test')
    const user = await db.collection('users').findOne({ id: userId })
    if (!user) return res.status(404).json('Could not find user!')
    const products = await db.collection('products').find({}).toArray()
    const cartItemIds = user.cartItems
    const cartItems = cartItemIds.map((id) =>
        products.find((product) => product.id === id)
    )
    res.status(200).json(cartItems)
    client.close()
})

router.post('/api/users/:userId/cart', async (req, res) => {
    const { userId } = req.params
    const { productId } = req.body
    const client = await MongoClient.connect('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const db = client.db('vue-db')
    await db.collection('users').updateOne(
        { id: userId },
        {
            $addToSet: { cartItems: productId }
        }
    )
    const user = await db.collection('users').findOne({ id: userId })
    const cartItemIds = user.cartItems
    const cartItems = cartItemIds.map((id) =>
        products.find((product) => product.id === id)
    )
    res.status(200).json(cartItems)
    client.close()
})

router.delete('/api/users/:userId/cart/:productId', async (req, res) => {
    const { userId, productId } = req.params
    const client = await MongoClient.connect('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const db = client.db('vue-db')

    await db.collection('users').updateOne(
        { id: userId },
        {
            $pull: { cartItems: productId }
        }
    )
    const user = await db.collection('users').findOne({ id: userId })
    const products = await db.collection('products').find({}).toArray()
    const cartItemIds = user.cartItems
    const cartItems = cartItemIds.map((id) =>
        products.find((product) => product.id === id)
    )

    res.status(200).json(cartItems)
    client.close()
})

module.exports = router
