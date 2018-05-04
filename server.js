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
  if (!waifu) return res.status(404).send(`${req.params.name} is not in the DB`)
  res.send(waifu)
})

app.post('/api/waifus', (req, res) => {
  const { error } = validateWaifu(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const waifu = {
    id: waifus.length + 1,
    name: req.body.name
  }
  waifus.push(waifu)
  res.send(waifu)
})

app.put('/api/waifus/:id', (req, res) => {
  const waifu = waifus.find(arr => arr.id === parseInt(req.params.id))
  if (!waifu) res.status(404).send(`${req.params.id} ID is not in the DB`)

  const { error } = validateWaifu(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  waifu.name = req.body.name
  res.send(waifu)
})

app.delete('/api/waifus/:id', (req, res) => {
  const waifu = waifus.find(arr => arr.id === parseInt(req.params.id))
  if (!waifu) {
    return res.status(404).send(`${req.params.id} ID is not in the DB`)
  }

  const index = waifus.indexOf(waifu)
  waifus.splice(index, 1)

  res.send(waifu)
})

function validateWaifu (waifu) {
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(waifu, schema)
}

const port = process.env.PORT || 9000
app.listen(port, () => console.log(`listening on port ${port}...`))
