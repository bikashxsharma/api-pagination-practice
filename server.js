const express = require('express')
const mongoose = require('mongoose')
const User = require('./userModel')

const app = express()

mongoose.connect('mongodb://localhost/api-pagination', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.once('open', async () => {
  if (await User.countDocuments().exec() > 0) return
  Promise.all([
    User.create({ name: 'User 1' }),
    User.create({ name: 'User 2' }),
    User.create({ name: 'User 3' }),
    User.create({ name: 'User 4' }),
    User.create({ name: 'User 5' }),
    User.create({ name: 'User 6' }),
    User.create({ name: 'User 7' }),
    User.create({ name: 'User 8' }),
    User.create({ name: 'User 9' }),
    User.create({ name: 'User 10' }),
    User.create({ name: 'User 11' }),
    User.create({ name: 'User 12' }),
    User.create({ name: 'User 13' }),
    User.create({ name: 'User 14' }),
    User.create({ name: 'User 15' }),
    User.create({ name: 'User 16' }),
    User.create({ name: 'User 17' }),
    User.create({ name: 'User 18' }),
  ]).then(() => console.log("user added"))

})

app.get('/users', paginationNumber(User), (req, res) => {

  res.json(res.paginatedResults)
})

function paginationNumber(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit
      }
    }

    if (endIndex < await model.countDocuments().exec()) {

      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    try {
      results.result = await model.find().limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()
    } catch (err) { res.send("500" + err) }


  }


}

app.listen(3000)
