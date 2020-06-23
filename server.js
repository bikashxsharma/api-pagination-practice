const express = require('express')
const app = express()

const users = [
  {
    "id": 1,
    "name": "Bikash"
  },
  {
    "id": 2,
    "name": "Anish"
  },
  {
    "id": 3,
    "name": "Sipuli"
  },
  {
    "id": 4,
    "name": "Arto"
  },
  {
    "id": 5,
    "name": "Yazan"
  },
  {
    "id": 6,
    "name": "Dung"
  },
  {
    "id": 7,
    "name": "Sikash"
  },
  {
    "id": 8,
    "name": "kash"
  },
  {
    "id": 9,
    "name": "Bdkash"
  },
]

const posts = [
  {
    "id": 1,
    "name": "Post Bikash"
  },
  {
    "id": 2,
    "name": "Anish"
  },
  {
    "id": 3,
    "name": "Sipuli"
  },
  {
    "id": 4,
    "name": "Post Arto"
  },
  {
    "id": 5,
    "name": "Yazan"
  },
  {
    "id": 6,
    "name": "Dung"
  },
  {
    "id": 7,
    "name": "Sikash"
  },
  {
    "id": 8,
    "name": "kash"
  },
  {
    "id": 9,
    "name": "Bdkash"
  },
]

app.get('/users', paginationNumber(users), (req, res) => {

  res.json(res.paginatedResults)
})

function paginationNumber(model) {
  return (req, res, next) => {
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

    if (endIndex < model.length) {

      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    results.result = model.slice(startIndex, endIndex)
    res.paginatedResults = results
    next()
  }


}

app.listen(3000)
