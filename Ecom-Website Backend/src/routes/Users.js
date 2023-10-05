const express = require('express') // Importera express-modulen
const router = express.Router() // Skapa en ny router-instans från express-modulen.

const Users = require('../models/usersModel')

router.get('/api/users/:userId/cart', async (req, res) => {
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
    await db.collection('users').updateOne(
        { id: userId },
        {
            $addToSet: { cartItems: productId }
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

router.delete('/api/users/:userId/cart/:productID', async (req, res) => {
    const { userId, productID } = req.params

    await db.collection('users').updateOne(
        { id: userId },
        {
            $pull: { cartItems: productID }
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
