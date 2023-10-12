import { MongoClient } from 'mongodb'
const dotenv = require('dotenv').config()

let db
const connectDB = async () => {
    if (db) return db
    const client = await MongoClient.connect(`${DB_URL}`)
    db = client.db('test')
    return db
}

module.exports = connectDB
