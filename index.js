// admin: todo-admin
// password: TtWvYrYvaqIUTivV
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
// middleware
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))