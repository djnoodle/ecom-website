const mongoose = require('mongoose')

const usersSchema = mongoose.Schema(
    {
        id: {
            type: String
        },
        cartItems: {
            type: Object
        }
    },
    {
        collection: 'users'
    }
)

const Users = mongoose.model('Users', usersSchema)

module.exports = Users
