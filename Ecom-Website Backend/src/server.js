const express = require('express')
import { MongoClient } from 'mongodb';
const dotenv = require('dotenv') // Importerar dotenv-paketet som används för att läsa miljövariabler från en .env-fil.
const seedProducts = require('./seed/seedProducts')
const seedUsers = require('./seed/seedUsers')

const app = express()

// Routes
const productsRoute = require('./routes/Products')
const usersRoute = require('./routes/Users')

app.use(express.json()) // Middleware som används för att tolka JSON-data i inkommande förfrågningar.
app.use(express.urlencoded({ extended: true })) // Middleware som används för att tolka URL-kodad data i inkommande förfrågningar.

dotenv.config()

app.get('/', (req, res) => {
    res.send('This is the Server side!')
})

app.use('/products', productsRoute)
app.use('/users', usersRoute)

mongoose
    .connect(
        // Anslutning mot databasen. Användarnamn och lösenord 'DB_USERNAME' och 'DB_PASSWORD' hämtas från .env (som inte skickas till Github, ligger i .gitignore)
        `${process.env.DB_URL}`,
        {
            useNewUrlParser: true, //Används för att ange att Mongoose ska använda den nya URL-parsern när den ansluter till MongoDB. Den är mer robust och stödja fler funktioner
            useUnifiedTopology: true //Används för att aktivera den nya enhetliga topologin i MongoDB-drivern. Är utformad för att vara mer stabil och effektiv. Det hjälper till att hantera anslutningar, klystring och övervakning av MongoDB-servern på ett bättre sätt.
        }
    )
    .then(() => {
        console.log('Successfully connected to the database.')
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log('Could not connect to the database. Error...', error)
        process.exit()
    })

//Populate database
// seedProducts()
// seedUsers()

const PORT = 8000
