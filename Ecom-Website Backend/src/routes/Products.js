const express = require('express') // Importera express-modulen
const router = express.Router() // Skapa en ny router-instans från express-modulen.

const Products = require('../models/productsModel')
// Get all products

// router.get('/', async (req, res) => {
//     const products = await Products.find({}).toArray()
//     res.status(200).json(products)
//     client.close()
// })

router.get('/', async (req, res) => {
    try {
        const products = await Products.find({}).sort({ id: 'asc' }) // Hämta data från databasen i ording efter id
        console.log('Fetched from database')
        res.status(200).json(products) // Skicka datan som JSON-svar med statuskod 200.
    } catch (error) {
        // Fångar eventuella fel som kan uppstå.
        res.status(500).json({ message: error.message }) // Skickar ett svar med statuskod 500 (Internal Server Error) och felmeddelandet som JSON-data.
    }
})

//Get specific product

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const products = await Products.find({ id })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
