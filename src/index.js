const express = require('express')
const cors = require('cors')

const userRouter = require('./routers/userRouter')

const app = express()
// const port = process.env.PORT || 2019
const port = 2022

app.use(cors())
app.use(express.json())
app.use(userRouter)

app.listen(port, ()=>{
    console.log(`running at port ${port}`)
})