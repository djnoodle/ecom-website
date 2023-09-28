const express = require('express')
const bodyParser = require('body-parser')

const products = [
    {
        id: '1',
        name: 'Air Force 1 Vit',
        price: '1200',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
        imageUrl: '/Ecom-Website Backend/assets/airforce1.jpg',
        averageRating: '5.0'
    },
    {
        id: '2',
        name: 'Air Jordan 4 Blackcanvas',
        price: '4500',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
        imageUrl: '/Ecom-Website Backend/assets/aj14blackcanvas.jpg',
        averageRating: '5.0'
    },
    {
        id: '3',
        name: 'SB dunk Gratefuldead Grön',
        price: '10000',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
        imageUrl: '/Ecom-Website Backend/assets/dunkgratefuldead.jpg',
        averageRating: '5.0'
    },
    {
        id: '4',
        name: 'Moncler Gui Blå',
        price: '3500',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
        imageUrl: '/Ecom-Website Backend/assets/guiblue.jpg',
        averageRating: '5.0'
    },
    {
        id: '5',
        name: 'Air Jordan 4 Midnightnavy',
        price: '3500',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
        imageUrl: '/Ecom-Website Backend/assets/Jordan4midnightnavy.jpg',
        averageRating: '5.0'
    },
    {
        id: '6',
        name: 'Palm Angles keps',
        price: '1499',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
        imageUrl: '/Ecom-Website Backend/assets/pinkcap1.jpg',
        averageRating: '5.0'
    },
    {
        id: '7',
        name: 'Air Jordan 1 UNC toe',
        price: '3300',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
        imageUrl: '/Ecom-Website Backend/assets/unchigh.jpg',
        averageRating: '5.0'
    }
]

let cartItems = [products[0], products[2], products[3]]

const app = express()
app.use(bodyParser.json())
const port = 8000

app.get('/api/products', (req, res) => {
    res.status(200).json(products)
})

app.get('/api/users/:userId/cart', (req, res) => {
    res.status(200).json(cartItems)
})

app.get('/api/products/:productId', (req, res) => {
    const { productId } = req.params
    const product = products.find((product) => product.id === productId)
    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404).json('Kunde inte hitta produkten')
    }
})

app.post('/api/users/:userId/cart', (req, res) => {
    const { productID } = req.body
    const product = products.find((product) => product.id === productID)
    if (product) {
        cartItems.push(product)
        res.status(200).json(cartItems)
    } else {
        res.status(404).json('Hittade inte produkten')
    }
})

app.delete('/api/users/:userId/cart/:productID', (req, res) => {
    const { productID } = req.params
    cartItems = cartItems.filter((product) => product.id !== productID)
    res.status(200).json(cartItems)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
