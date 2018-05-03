const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const waifus = [
  { id: 1, name: 'isla' },
  { id: 2, name: 'taiga' },
  { id: 3, name: 'yuno' },
  { id: 4, name: 'ayase' }
]

app.get('/', (req, res) => {
  res.send(waifus)
})

app.get('/api/waifus', (req, res) => {
  res.send(waifus)
})

app.get('/api/waifus/:name', (req, res) => {
  const waifu = waifus.find(arr => arr.name === req.params.name)
  if (!waifu) res.status(404).send(`${req.params.name} is not in the DB`)
  res.send(waifu)
})

app.post('/api/waifus', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
  }
  const result = Joi.validate(req.body, schema)

  if (result.error) {
    res.status(400).send(result.error.details[0].message)
    return
  }

  const waifu = {
    id: waifus.length + 1,
    name: req.body.name
  }
  waifus.push(waifu)
  res.send(waifu)
})

const port = process.env.PORT || 9000
app.listen(port, () => console.log(`listening on port ${port}...`))
