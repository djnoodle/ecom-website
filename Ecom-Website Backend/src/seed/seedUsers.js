const Users = require('../models/usersModel')
const usersData = require('./userData')

module.exports = async function seedUsers() {
    await Promise.all(usersData.map((item) => Users.create(item)))
}
