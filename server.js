const express = require('express')
const app = express()

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
  res.send(['Isla', 'Taiga', 'Yuno', 'Ayase'])
})

app.get('/api/waifus/:name', (req, res) => {
  const waifu = waifus.find(arr => arr.name === req.params.name)
  if (!waifu) res.status(404).send(`${req.params.name} is not in the DB`)
  res.send(waifu)
})

const port = process.env.PORT || 9000
app.listen(port, () => console.log(`listening on port ${port}...`))
