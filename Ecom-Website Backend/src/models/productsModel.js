const mongoose = require('mongoose')

const ProductsSchema = mongoose.Schema(
    {
        id: {
            type: String
        },
        name: {
            type: String
        },
        price: {
            type: String
        },
        description: {
            type: String
        },
        imageUrl: {
            type: String
        },
        averageRating: {
            type: String
        }
    },
    {
        collection: 'products'
    }
)

const Products = mongoose.model('Products', ProductsSchema)

module.exports = Products
