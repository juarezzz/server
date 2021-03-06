const express = require('express')
const bookRouter = require('./routes/books')
const userRouter = require('./routes/users')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/books', bookRouter)

app.use('/users', userRouter)

app.use((err, req, res, next) => {
    res.status(500).end()
})

const CONNECTION_URL = 'mongodb+srv://juarez:FQp9XFs2jzpDCrQd@cluster0.dg7ku.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    }))
    .catch((error) => console.log(error.message))